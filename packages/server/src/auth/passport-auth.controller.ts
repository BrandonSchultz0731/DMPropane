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
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./guards/passport-local.guard";
import { cleanedUser } from "../utils/cleaner";
import { PassportJwtAuthGuard } from "./guards/passport-jwt.guard";
import { UsersService } from "../users/users.service";

@Controller("auth")
export class PassportAuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Req() request: { user: ReturnType<typeof cleanedUser> }) {
        const user = request.user
        if (!user) throw new UnauthorizedException()
        return this.authService.signIn(user)
    }

    @Get('me')
    @UseGuards(PassportJwtAuthGuard)
    async getUserInfo(@Req() request: { user: { id: string; email: string } | null }) {
        if (!request.user) throw new UnauthorizedException()
        const user = await this.usersService.findUserByEmail(request.user.email)
        return cleanedUser(user)
    }

    @Post('logout')
    @UseGuards(PassportJwtAuthGuard)
    logout(@Req() request: { user: { id: string; email: string } | null }) {
        request.user = null
        // TODO: Somehow invalidate the auth token
        return { message: 'Logged out' }
    }
}
