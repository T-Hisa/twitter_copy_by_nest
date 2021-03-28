import { Controller, Get, Next } from "@nestjs/common";
import { NextFunction } from "express";
// import { BoardsService } from "./boards.service";
// import { BoardInterface } from "./boards.interface"

@Controller()
export class RootController {
  // constructor(private readonly boardsService: BoardsService) {}
  @Get()
  getBoards(@Next() next: NextFunction): any {
    // const boards = this.boardsService.findAll()
    console.log('root Controller!')
    next()
    // return 'this is board'
  }
}