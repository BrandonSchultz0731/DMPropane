import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Entity({ name: "users" })
export class User implements User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: "text" })
  password!: string;

  public constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
