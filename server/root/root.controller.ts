import { Controller, Get, Next, Redirect } from "@nestjs/common";
import { NextFunction } from "express";
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
    console.log('redirect')
    // next()
    // return 'sample'
  }
}