import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { UsersService } from "./users/users.service";
import { UsersController } from "./users/users.controller";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "dmpropane_user",
      password: "dmpropane_password",
      database: "dmpropane_db",
      autoLoadEntities: true,
      synchronize: true, // Disable in production
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
