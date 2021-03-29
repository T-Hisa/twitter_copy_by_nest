import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    console.log('req.user', req.user);
    const user = req.user;
    const access_token = await this.authService.login(req.user);
    // {...user, ...access_token} のように記述すると、なぜか user 側のデータのみ構造がおかしくなるので、userのまま
    const data = { user, ...access_token };
    return data;
  }

  @Post('/logout')
  async logout() {}

  // @UseGuards(AuthGuard('jwt'))
  // @Get('/create-board')
  // async sample() {
  //   console.log('sample')
  //   return { data: 'sample'}
  // }
}
