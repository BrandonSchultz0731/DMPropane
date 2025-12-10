import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/user.entity";
import { UserResponse } from "../users/user-response.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async signup(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const user = this.users.create({
      name,
      email,
      password: hashed,
    });

    await this.users.save(user);
    return new UserResponse(user);
  }

  async login(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException("Invalid credentials");

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    }, { expiresIn: '15m' });

    const refreshToken = this.jwtService.sign({
      sub: user.id,
      email: user.email
    }, { expiresIn: '7d' })

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await this.usersService.updateRefreshToken(user.id, refreshTokenHash)


    return {
      accessToken,
      refreshToken,
      user: new UserResponse(user),
    };
  }

  async refresh(userId: number, incomingRefreshToken: string) {
    const user = await this.usersService.findEntity(userId);

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(
      incomingRefreshToken,
      user.refreshTokenHash,
    );

    if (!isValid) {
      throw new UnauthorizedException('Refresh token invalid');
    }

    const payload = { sub: user.id, email: user.email };

    const newAccessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    return newAccessToken;
  }

  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);
  }

}
