import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  // constructor()
  // @UseGuards(AuthGuard('local'))

  @Post('/login')
  async login(@Request() req, @Body() userData: any) {
    console.log('req', req)
    console.log('userData' ,userData)
    // return req.user
  }

  @Post('/logout')
  async logout() {

  }
}