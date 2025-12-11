import {
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    NotImplementedException,
    Get,
    UseGuards,
    Req,
    UnauthorizedException,
    Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./guards/passport-local.guard";
import { cleanedUser } from "../utils/cleaner";
import { PassportJwtAuthGuard } from "./guards/passport-jwt.guard";
import { TokenBlacklistGuard } from "./guards/token-blacklist.guard";
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import { TokenBlacklistService } from "./token-blacklist.service";

@Controller("auth")
export class PassportAuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private configService: ConfigService,
        private tokenBlacklistService: TokenBlacklistService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    async login(
        @Req() request: { user: ReturnType<typeof cleanedUser> },
        @Res({ passthrough: true }) response: any
    ) {
        const user = request.user
        if (!user) throw new UnauthorizedException()

        const authResult = await this.authService.signIn(user)

        // Set httpOnly cookie with the token
        const isProduction = this.configService.get('NODE_ENV') === 'production'
        const cookieOptions = {
            httpOnly: true, // Prevents JavaScript access (XSS protection)
            secure: isProduction, // Only send over HTTPS in production
            sameSite: isProduction ? 'none' as const : 'lax' as const, // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (match JWT expiration)
            path: '/',
        }

        response.cookie('access_token', authResult.accessToken, cookieOptions)

        // Return user data without the token (token is in cookie)
        const { accessToken, ...userData } = authResult
        return userData
    }

    @Get('me')
    @UseGuards(TokenBlacklistGuard, PassportJwtAuthGuard)
    async getUserInfo(@Req() request: { user: { id: string; email: string } | null }) {
        if (!request.user) throw new UnauthorizedException()
        const user = await this.usersService.findUserByEmail(request.user.email)
        return cleanedUser(user)
    }

    @Post('logout')
    @UseGuards(TokenBlacklistGuard, PassportJwtAuthGuard)
    async logout(
        @Req() request: any,
        @Res({ passthrough: true }) response: any
    ) {
        // Extract the token from cookie or Authorization header
        const token = request?.cookies?.['access_token'] ||
            request?.headers?.authorization?.replace('Bearer ', '') ||
            null;

        if (token) {
            // Add token to blacklist
            await this.tokenBlacklistService.blacklistToken(token);
        }

        request.user = null

        // Clear the access token cookie
        const isProduction = this.configService.get('NODE_ENV') === 'production'
        response.cookie('access_token', '', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' as const : 'lax' as const,
            maxAge: 0, // Immediately expire
            path: '/',
        })

        return { message: 'Logged out' }
    }
}
