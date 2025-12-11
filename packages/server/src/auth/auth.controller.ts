import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Get,
  Req,
  BadRequestException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { ConfigService } from "@nestjs/config";
import { SmartJwtGuard } from "./smartJwt.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private auth: AuthService,
    private usersSerice: UsersService,
    private configService: ConfigService
  ) {}

  @UseGuards(SmartJwtGuard)
  @Get("me")
  async me(@Req() req: any) {
    const user = await this.usersSerice.findOne(req.user.sub);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  
  @Post("signup")
  signup(@Body() body: { name: string; email: string; password: string }) {
    if (!body.name || !body.email || !body.password ) {
      throw new BadRequestException('You must fill out all fields')
    }
    return this.auth.signup(body.name, body.email.toLowerCase(), body.password);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post("login")
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: any
  ) {
    const { accessToken, user } = await this.auth.login(
      body.email.toLowerCase(),
      body.password
    );

    const nodeEnv = this.configService.get<string>("NODE_ENV");
    const isProduction = nodeEnv === "production";

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: Number(this.configService.get('JWT_MAX_AGE_MS')),
    });

    return { user };
  }

  @UseGuards(SmartJwtGuard)
  @Post("logout")
  async logout(@Res({ passthrough: true }) res: any, @Req() req: any) {
    const nodeEnv = this.configService.get<string>("NODE_ENV");
    const isProduction = nodeEnv === "production";

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    req.user = null

    return { success: true };
  }
}
