import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path'

@Injectable()
export class RootMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    return next();
  }
}
