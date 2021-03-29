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


  @UseGuards(AuthGuard('jwt'))
  @Post('/create-board')
  async createBoard(@Request() req, @Body() createBoardDto: CreateBoardDto) {
    createBoardDto._id = new mongoose.Types.ObjectId
    const boards = await this.boardsService.createBoard(createBoardDto)
    return boards
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('get-boards-for-home-display')
  async getBoardsForHomeDisplay(@Request() req) {
    const boardsForHomeDisplay = await this.boardsService.getBoardsForHomeDisplay(req.user?._id)
    return boardsForHomeDisplay
  }
}
