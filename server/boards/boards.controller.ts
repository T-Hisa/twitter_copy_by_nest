import { Body, Controller, Get, Next, Post, Request, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { CreateBoardDto } from './boards.create.dto';
import { BoardsService } from './boards.service';
// import { BoardInterface } from "./boards.interface"

@Controller()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  // @Get('/*')
  // sampleGet(@Next() next: NextFunction, @Res() res: Response): any {
  //   const boards = this.boardsService.findAll();
  //   console.log('boards Controller!');
  //   // console.log('res', res)
  //   next();
  //   // return 'this is board'
  // }
  @Post('/get-boards')
  async getBoards() {
    const boards = await this.boardsService.findAll();
    return boards;
  }

  @Post('/create-board')
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    console.log('sendData', createBoardDto)
    const boards = await this.boardsService.createBoard(createBoardDto)
    console.log('boards', boards)
    return boards
  }
}
