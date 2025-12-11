import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/user.entity";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { cleanedUser } from "../utils/cleaner";

type AuthInput = { email: string; password: string }
type AuthResult = { accessToken: string; id: number; email: string };

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input)

    if (!user) {
      throw new UnauthorizedException()
    }

    return this.signIn(user)
  }

  async validateUser(input: AuthInput): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(input.email)
    if (!user) {
      return null
    }
    const isMatch = await bcrypt.compare(input.password, user?.password)
    if (isMatch) {
      return user
    }
    return null
  }

  async signIn(user: User): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.id,
      email: user.email
    }
    const accessToken = await this.jwtService.signAsync(tokenPayload)
    const cleanUser = cleanedUser(user)
    if (!cleanUser) {
      throw new UnauthorizedException()
    }
    return {
      ...cleanUser,
      accessToken,
    }
  }

}
