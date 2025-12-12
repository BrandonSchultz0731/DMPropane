import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportAuthController } from "./passport-auth.controller";
import { LocalStrategry } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { TokenBlacklistService } from "./token-blacklist.service";
import { TokenBlacklistGuard } from "./guards/token-blacklist.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: config.get("JWT_EXPIRES_IN") },
      }),
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategry, JwtStrategy, TokenBlacklistService, TokenBlacklistGuard],
  controllers: [PassportAuthController],
  exports: [
    AuthService,
    JwtModule
  ],
})
export class AuthModule { }
