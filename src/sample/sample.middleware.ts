import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}


export function SampleMiddlewareFunction(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};