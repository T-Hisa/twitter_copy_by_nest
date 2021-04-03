import { Controller, Get, Next, Redirect, Res } from "@nestjs/common";
import { NextFunction } from "express";
import { join } from 'path';
// import { BoardsService } from "./boards.service";
// import { BoardInterface } from "./boards.interface"

@Controller()
export class RootController {
  // constructor(private readonly boardsService: BoardsService) {}
  // @Get('/')
  // rootGet(@Next() next: NextFunction): any {
  //   console.log('rootController')
  //   next()
  //   // return 'this is board'
  // }

  // ここでこの記述をしておかないと、例えば、 /home/static など、ネストしたURLリクエストがあった際にエラーを吐き出してしまう。
  @Get('/**/*')
  @Redirect('/')
  redirectRoot() {
  }

  // redirectRoot(@Res() res: Response) {
  //   res.sendFile('index.html', {
  //   root: join(process.cwd(), 'dist', 'client')
  //   });
  // }
}