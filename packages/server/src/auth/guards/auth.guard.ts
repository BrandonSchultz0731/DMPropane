import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../users/users.service";
import { cleanedUser } from "../../utils/cleaner";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private usersService: UsersService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const authorization = request.headers.authorization; // Bearer <token>
        const token = authorization?.split(' ')[1]

        if (!token) {
            throw new UnauthorizedException()
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync(token)
            const user = await this.usersService.findUserByEmail(tokenPayload.email)
            request.user = cleanedUser(user)
            return true
        } catch (err) {
            throw new UnauthorizedException()
        }
    }
}