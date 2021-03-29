import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy as StrategyLocal } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(StrategyLocal) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(_id: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(_id, password)
    if (!user) throw new UnauthorizedException()
    return user
  }

}