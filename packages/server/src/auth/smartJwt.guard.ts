import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    CanActivate
  } from "@nestjs/common";
  import { JwtService } from "@nestjs/jwt";
  import { AuthService } from "./auth.service";
  import { ConfigService } from "@nestjs/config";
  
  @Injectable()
  export class SmartJwtGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private authService: AuthService,
      private configService: ConfigService
    ) {}
  
    async canActivate(ctx: ExecutionContext) {
      const req = ctx.switchToHttp().getRequest();
      const res = ctx.switchToHttp().getResponse();
  
      const access = req.cookies?.access_token;
      const refresh = req.cookies?.refresh_token;
  
      if (!access) throw new UnauthorizedException();
  
      try {
        const payload = await this.jwtService.verifyAsync(access, {
          secret: this.configService.get("JWT_SECRET"),
        });
        req.user = payload;
        return true;
      } catch {
        if (!refresh) throw new UnauthorizedException();
  
        const refreshPayload = await this.jwtService.verifyAsync(refresh, {
          secret: this.configService.get("JWT_SECRET"),
        });
  
        const newAccessToken = await this.authService.refresh(
          refreshPayload.sub,
          refresh,
        );

        console.log("NEW TOKEN: ", newAccessToken)
  
        const isProduction = this.configService.get("NODE_ENV") === "production";
  
        res.cookie("access_token", newAccessToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
          maxAge: 15 * 60 * 1000,
        });
  
        return true;
      }
    }
  }
  