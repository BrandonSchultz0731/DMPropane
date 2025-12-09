import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User as UserType } from "@brandon0731/types";

@Entity({ name: "users" })
export class User implements UserType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: "text", nullable: true })
  phoneNumber?: string;

  @Column({ type: "text" })
  password!: string;

  public constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
