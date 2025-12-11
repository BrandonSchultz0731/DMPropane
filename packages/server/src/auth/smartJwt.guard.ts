import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    CanActivate
  } from "@nestjs/common";
  import { JwtService } from "@nestjs/jwt";
  import { ConfigService } from "@nestjs/config";
  
  @Injectable()
  export class SmartJwtGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService: ConfigService
    ) {}
  
    async canActivate(ctx: ExecutionContext) {
      const req = ctx.switchToHttp().getRequest();
      const res = ctx.switchToHttp().getResponse();
  
      const access = req.cookies?.access_token;
      if (!access) throw new UnauthorizedException();
  
      let payload;
      try {
        payload = await this.jwtService.verifyAsync(access, {
          secret: this.configService.get("JWT_SECRET"),
        });
      } catch {
        throw new UnauthorizedException('Token invalid or expired');
      }
  
      // Generate a new token on every request
      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        { expiresIn: this.configService.get('JWT_EXPIRES_IN') }
      );
  
      const isProduction = this.configService.get("NODE_ENV") === "production";
      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: Number(this.configService.get('JWT_MAX_AGE_MS')),
      });
  
      req.user = payload;
      return true;
    }
  }
  