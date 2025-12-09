import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersService } from "./services/users.service";
import { UsersController } from "./controllers/users.controller";

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
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
