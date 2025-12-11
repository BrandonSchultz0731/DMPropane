import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/user.entity";
import { UserResponse } from "../users/user-response.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService
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
    }, { expiresIn: this.configService.get('JWT_EXPIRES_IN') });


    return {
      accessToken,
      user: new UserResponse(user),
    };
  }


 

}
