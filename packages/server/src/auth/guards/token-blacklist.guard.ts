import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { TokenBlacklistService } from "../token-blacklist.service";

/**
 * Guard that checks if the JWT token is blacklisted.
 * Should be used before PassportJwtAuthGuard.
 */
@Injectable()
export class TokenBlacklistGuard implements CanActivate {
  constructor(private tokenBlacklistService: TokenBlacklistService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request?.cookies?.['access_token'] ||
      request?.headers?.authorization?.replace('Bearer ', '') ||
      null;

    if (!token) {
      // No token found, let the JWT guard handle the error
      return true;
    }

    const isBlacklisted = await this.tokenBlacklistService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new UnauthorizedException('Token has been revoked');
    }

    return true;
  }
}
