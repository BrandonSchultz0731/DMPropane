export class UserResponse {
  id: number;
  name: string;
  email: string;

  constructor(user: { id: number; name: string; email: string }) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
