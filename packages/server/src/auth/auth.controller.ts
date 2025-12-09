import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Get,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "../users/users.service";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService, private usersSerice: UsersService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  async me(@Req() req: any) {
    const user = await this.usersSerice.findOne(req.user.id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  @Post("signup")
  signup(@Body() body: { name: string; email: string; password: string }) {
    return this.auth.signup(body.name, body.email, body.password);
  }

  @Post("login")
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: any
  ) {
    const { access_token, user } = await this.auth.login(
      body.email,
      body.password
    );

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { user };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: any) {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return { success: true };
  }
}
