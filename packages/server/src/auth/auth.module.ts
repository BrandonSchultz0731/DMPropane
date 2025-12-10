import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SmartJwtGuard } from "./smartJwt.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "15m" },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, UsersService, SmartJwtGuard],
  controllers: [AuthController],
  exports: [
    AuthService,
    SmartJwtGuard,
    JwtModule
  ],
})
export class AuthModule {}
