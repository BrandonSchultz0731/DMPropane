import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthGuard } from "@nestjs/passport";
import { UserResponse } from "./user-response.dto";
import { SmartJwtGuard } from "../auth/smartJwt.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<UserResponse | null> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id: number): Promise<void> {
    return this.usersService.delete(id);
  }

  @UseGuards(SmartJwtGuard)
  @Get('/protected/profile')
  profile() {
    return {
      message: 'You are authenticated',
    };
  }
}
