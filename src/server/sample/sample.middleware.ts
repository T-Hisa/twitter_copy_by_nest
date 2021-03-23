import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SampleService } from './sample.service';
import * as path from 'path'

@Injectable()
export class SampleMiddleware implements NestMiddleware {
  constructor(private readonly sampleService: SampleService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('sample middleware!!', req.path)
    if (/[^\\/]+\.[^\\/]+$/.test(req.path)) {
    // if (true) {
      const fileName = '/index.js'
      const file = this.getAssetPath(fileName)
      console.log('file', file)
      res.sendFile(file, (e) => {
        // if (e) res.status(e.).end()
        console.log(e)
      })
    } else {
      console.log('next')
      return next()
    }
    // console.log('Request...');
    // next();
  }

  private getAssetPath (url: string) {
    // const basePath = this.configService.get('CLIENT_BUILD_PATH');
    const basePath = 'public/public'
    // return path.join(basePath, url)
    return path.resolve(path.join(basePath, url))
  }
}


export function SampleMiddlewareFunction(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};