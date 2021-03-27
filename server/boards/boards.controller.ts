import { Controller, Get, Next, Post, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { BoardsService } from './boards.service';
// import { BoardModel } from "./boards.model"
// import { BoardInterface } from "./boards.interface"

@Controller()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  @Get()
  sampleGet(@Next() next: NextFunction, @Res() res: Response): any {
    const boards = this.boardsService.findAll();
    console.log('boards Controller!');
    // console.log('res', res)
    next();
    // return 'this is board'
  }

  @Post('/get-boards')
  getBoards() {
    return { data: 'sample' };
  }
}
