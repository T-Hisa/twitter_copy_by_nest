import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  AggregationCursor,
  Connection,
  FilterQuery,
  Model,
  Mongoose,
} from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { Board, BoardDocument, BoardSchema } from './board.schema';
import { CreateBoardDto } from './boards.create.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>, // @InjectConnection() private connection: Connection
  ) {}

  async findAll(): Promise<Board[]> {
    const boardsObject = await this.boardModel.find().populate('user').exec();
    return boardsObject;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const createBoard = new this.boardModel(createBoardDto);
    console.log('create board now!', createBoard);
    return createBoard.save();
  }

  async getBoardsForHomeDisplay(id: string): Promise<Board[]> {
    const allBoards = await this.boardModel.find().exec()
    console.log('allBoards', allBoards)
    const amount = allBoards.length
    console.log('amount', amount)
    const loginUser = await this.userModel.findById(id).exec();
    const following_user_ids = [loginUser._id, ...loginUser.following_userids];
    const repost_boards = await this.boardModel
      .find(
        {
          // 再投稿したもの
          $and: [
            { user: { $in: following_user_ids } },
            { origin_board: { $exists: true } },
            { body: { $exists: false } },
          ],
        },
        // { origin_board: 1 },
      )
      .sort({ timestamp: -1 })
      .skip(0)
      .limit(20)
      .exec();

    console.log('repost_boards', repost_boards)

    const quote_post_boards = await this.boardModel
      .find(
        {
          // 引用投稿したもの
          $and: [
            { user: { $in: following_user_ids } },
            { origin_board: { $exists: true } },
            { body: { $exists: true } },
          ],
        },
        // { origin_board: 1 },
      )
      .sort({ timestamp: -1 })
      .skip(0)
      .limit(20)
      .exec();

    console.log('quote_post_boards', quote_post_boards)

    const full_repost_boards = repost_boards.concat(quote_post_boards);
    console.log('full_repost_boards', full_repost_boards);
    const quote_origin_board_ids = quote_post_boards.map((board) => {
      return this.parseString(board.origin_board)
    });
    const full_repost_origin_board_ids = full_repost_boards.map((board) => {
      return board.origin_board
    });
    // 表示用に引用投稿が含まれないもの かつ 再投稿するにあたって、それ自身（再投稿元）の重複も無くす処理
    let already_repost_index = {};
    const repost_boards_for_display = repost_boards.filter((board) => {
      const repost_origin_board_parse_string = this.parseString(board.origin_board)
      const already_quote_flag = quote_origin_board_ids.indexOf(repost_origin_board_parse_string) === -1;
      if (already_quote_flag) return false;
      if (already_repost_index[repost_origin_board_parse_string]) {
        return false;
      }
      already_repost_index[repost_origin_board_parse_string] = true;
      return true;
    });
    const repost_board_ids_for_display = repost_boards_for_display.map(board => board._id)
    console.log('already_repost_index', already_repost_index)
    already_repost_index = {};
    console.log('already_repost_index after', already_repost_index)
    console.log('repost_board_ids_for_display', repost_board_ids_for_display)
    const boardsForHomeDisplay = await this.boardModel
      .find({
        $or: [
          {
            // 普通の投稿したもの & 引用投稿したもの
            $and: [
              { user: { $in: following_user_ids } },
              { reply_to: { $exists: false } },
              { body: { $exists: true } },
              { _id: { $nin: full_repost_origin_board_ids } },
            ],
          },
          {
            // 再投稿したもので、表示されるものの中に引用投稿が含まれないもの かつ まだ再投稿として表示されていないもの(重複を防ぐ)
            _id: {
              $in: repost_board_ids_for_display,
            },
          },
        ],
      })
      .sort({ timestamp: -1 })
      .skip(0)
      .limit(20)
      .populate('user')
      .populate('origin_board')
      .exec();
    // const boardsExcludeMultiple = await this.boardModel.find({});
    // console.log('boardsForHomeDisplay', boardsForHomeDisplay);
    return boardsForHomeDisplay;
  }

  parseString(str: any): string {
    return JSON.parse(JSON.stringify(str))
  }
}
