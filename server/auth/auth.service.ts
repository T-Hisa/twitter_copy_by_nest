import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async createUser(username: string, password: string): Promise<any> {

  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    console.log('user in auth', user)
    if (user && user.password === password) {
      return user
    }
    return null
  }
}
