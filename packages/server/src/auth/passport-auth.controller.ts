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

        const isProduction = this.configService.get('NODE_ENV') === 'production'
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' as const : 'lax' as const,
            maxAge: this.configService.get('JWT_MAX_AGE_MS'),
            path: '/',
        }

        response.cookie('access_token', authResult.accessToken, cookieOptions)

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
        const token = request?.cookies?.['access_token'] ||
            request?.headers?.authorization?.replace('Bearer ', '') ||
            null;

        if (token) {
            await this.tokenBlacklistService.blacklistToken(token);
        }

        request.user = null

        const isProduction = this.configService.get('NODE_ENV') === 'production'
        response.cookie('access_token', '', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' as const : 'lax' as const,
            maxAge: 0,
            path: '/',
        })

        return { message: 'Logged out' }
    }
}
