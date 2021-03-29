import { Body, Controller, Get, Next, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  // @Post('get-boards-for-home-display')
  // async getBoardsForHomeDisplay() {
  //   const boardsForHomeDisplay = await this.boardsService
  // }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-board')
  async createBoard(@Request() req, @Body() createBoardDto: CreateBoardDto) {
    console.log('sendData', createBoardDto)
    createBoardDto._id = new mongoose.Types.ObjectId
    console.log('request', req)
    console.log('request.user', req.user)
    const boards = await this.boardsService.createBoard(createBoardDto)
    console.log('boards', boards)
    return boards
  }
}
