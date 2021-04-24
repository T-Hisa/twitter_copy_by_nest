import {
  Body,
  Controller,
  Get,
  Next,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as mongoose from 'mongoose';
import { CreateBoardInterface, LikeBoardData } from '../../types';
import { CreateBoardDto } from './boards.create.dto';
import { BoardsService } from './boards.service';



@Controller()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('get-boards-for-home-display')
  async getBoardsForHomeDisplay(@Request() req) {
    const boardsForHomeDisplay = await this.boardsService.getBoardsForHomeDisplay(
      req.user?._id,
    );
    return boardsForHomeDisplay;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('get-board-detail')
  async getDetailBoard(@Request() req, @Body() data: { bid: string }) {
    const board = await this.boardsService.getBoardDetail(data.bid);
    console.log('board', board);
    return board;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-board')
  async createBoard(
    @Body() createBoardData: CreateBoardInterface,
  ) {
    const { repost_bid, ...createBoardDto } = createBoardData;
    const board = await this.boardsService.createBoard(createBoardDto, repost_bid);
    return board;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/push-like')
  async pushLike(@Body() likeBoard: LikeBoardData) {
    console.log('likeBoardData', likeBoard);
    const updatedBoard = await this.boardsService.pushLike(likeBoard);
    console.log('updatedBoard', updatedBoard);
    return updatedBoard;
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('reply-board')
  // async replyBoard(@Body() replyBoardDto: CreateBoardDto) {
  //   replyBoardDto._id = new mongoose.Types.ObjectId()
  //   console.log('replyBoardDto', replyBoardDto)
  //   const board = await this.boardsService.createBoard(replyBoardDto)
  // }
}
