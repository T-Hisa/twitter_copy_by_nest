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

  // @Get('/*')
  // @Redirect('/')
  // redirectRoot(@Next() next: NextFunction) {
  //   console.log('redirect')
  //   next()
  // }
}