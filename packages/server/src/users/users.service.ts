import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";
import { UserResponse } from "./user-response.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // Return all users as DTOs
  async findAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserResponse(user));
  }

  // Return a single user as DTO or null
  async findOne(id: number): Promise<UserResponse | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user ? new UserResponse(user) : null;
  }

  async findEntity(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id })
  }

  async updateRefreshToken(id: number, refreshTokenHash: string | null): Promise<UserResponse | null> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    user.refreshTokenHash = refreshTokenHash
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  // Delete a user (no DTO needed)
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
