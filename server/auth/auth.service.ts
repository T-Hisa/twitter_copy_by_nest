import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(username: string, password: string): Promise<any> {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      user["password"] = null
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user._id };
    console.log('login payload is ', payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
