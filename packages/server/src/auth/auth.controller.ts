import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Body,
  Get,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "./guards/auth.guard";
import { cleanedUser } from "../utils/cleaner";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersSerice: UsersService,
    private configService: ConfigService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: { email: string; password: string }) {
    return this.authService.authenticate(input)
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Req() request: { user: ReturnType<typeof cleanedUser> }) {
    return request.user
  }

  @Post('logout')
  logout() {
    return { message: 'Logged out' }
  }
}
