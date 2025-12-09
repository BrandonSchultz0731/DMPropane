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
import { User } from "./user.entity";
import { AuthGuard } from "@nestjs/passport";
import { UserResponse } from "./user-response.dto";

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

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() user: Partial<User>
  ): Promise<UserResponse | null> {
    return this.usersService.update(id, user);
  }

  @Delete(":id")
  delete(@Param("id") id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
