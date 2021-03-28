import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class LoginController {
  // constructor()
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req, @Body() userData: any) {
    console.log('req', req)
    console.log('userData' ,userData)
    return req.user
  }

  @Post('/logout')
  async logout() {

  }
}