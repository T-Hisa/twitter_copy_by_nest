import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy as StorategyLocal } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStorategy extends PassportStrategy(StorategyLocal) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('validate!!!')
    const user = await this.authService.validateUser(username, password)
    if (!user) throw new UnauthorizedException()
    return user
  }

}