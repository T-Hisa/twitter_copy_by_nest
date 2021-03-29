import { Body, Controller, Get, Next, Post, Request, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import * as mongoose from 'mongoose';
import { CreateBoardDto } from './boards.create.dto';
import { BoardsService } from './boards.service';
// import { BoardInterface } from "./boards.interface"

@Controller()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  @Post('/get-boards')
  async getBoards() {
    const boards = await this.boardsService.findAll();
    return boards;
  }

  @Post('/create-board')
  async createBoard(@Request() req, @Body() createBoardDto: CreateBoardDto) {
    console.log('sendData', createBoardDto)
    createBoardDto._id = new mongoose.Types.ObjectId
    console.log('rea.user', req.user)
    const boards = await this.boardsService.createBoard(createBoardDto)
    console.log('boards', boards)
    return boards
  }
}
