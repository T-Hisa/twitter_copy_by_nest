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
import { LikeBoardData } from '@/types';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>, // @InjectConnection() private connection: Connection
  ) {}

  async getBoardDetail(id: string): Promise<Board> {
    let boardsObject: BoardDocument = await this.boardModel
      .findById(id)
      .populate('user')
      .populate('origin_board')
      .populate('reply_boards')
      .exec();

    boardsObject = ((await this.userModel.populate(boardsObject, {
      path: 'origin_board.user',
    })) as any) as BoardDocument;
    boardsObject = ((await this.userModel.populate(boardsObject, {
      path: 'reply_boards.user',
    })) as any) as BoardDocument;
    return boardsObject;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    repost_bid: string,
  ): Promise<Board> {
    const createBoard: BoardDocument = new this.boardModel(createBoardDto);
    console.log('create board now!', createBoard);
    const retBoard = await this.saveAndCreateBoard(createBoard, repost_bid);

    return retBoard;
  }

  async getBoardsForHomeDisplay(id: string): Promise<Board[]> {
    const allBoards = await this.boardModel.find().exec();
    console.log('allBoards', allBoards);
    const amount = allBoards.length;
    console.log('amount', amount);
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

    // console.log('repost_boards', repost_boards);

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

    // console.log('quote_post_boards', quote_post_boards);

    const full_repost_boards = repost_boards.concat(quote_post_boards);
    // console.log('full_repost_boards', full_repost_boards);
    const quote_origin_board_ids = quote_post_boards.map((board) => {
      return this.parseString(board.origin_board);
    });
    const full_repost_origin_board_ids = full_repost_boards.map((board) => {
      return board.origin_board;
    });
    // 表示用に引用投稿が含まれないもの かつ 再投稿するにあたって、それ自身（再投稿元）の重複も無くす処理
    let already_repost_index = {};
    const repost_boards_for_display = repost_boards.filter((board) => {
      const repost_origin_board_parse_string = this.parseString(
        board.origin_board,
      );
      const already_quote_flag =
        quote_origin_board_ids.indexOf(repost_origin_board_parse_string) > -1;
      if (already_quote_flag) return false;
      if (already_repost_index[repost_origin_board_parse_string]) {
        return false;
      }
      already_repost_index[repost_origin_board_parse_string] = true;
      return true;
    });
    const repost_board_ids_for_display = repost_boards_for_display.map(
      (board) => board._id,
    );
    already_repost_index = {};
    let boardsForHomeDisplay = await this.boardModel
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
      .populate({ path: 'user' })
      .populate('origin_board')
      .exec();
    boardsForHomeDisplay = ((await this.userModel.populate(
      boardsForHomeDisplay,
      { path: 'origin_board.user' },
    )) as any) as BoardDocument[];
    return boardsForHomeDisplay;
  }

  parseString(str: any): string {
    return JSON.parse(JSON.stringify(str));
  }

  async saveAndCreateBoard(board: BoardDocument, repost_bid: string) {
    const saveBoard = await board.save();
    if (board.reply_to) {
      // 返信の時は、返信元のみ更新
      console.log('board.reply_to', board.reply_to);
      await this.boardModel.updateOne(
        { _id: board.reply_to },
        {
          $inc: { reply_count: 1 },
          $push: { reply_boards: board._id },
        },
      );
      if (repost_bid) {
        // リツイートの場合は、リツイート元ではなく、リツイート先だけ更新しなくちゃならない
        let updatedRepostBoardPopulate = await this.boardModel
          .findById(repost_bid)
          .populate('user')
          .populate('origin_board');
        updatedRepostBoardPopulate = ((await this.userModel.populate(
          updatedRepostBoardPopulate,
          { path: 'origin_board.user' },
        )) as any) as BoardDocument;
        return updatedRepostBoardPopulate;
      }
      const updatedBoardPopulate = await this.boardModel
        .findById(board.reply_to)
        .populate('user');
      console.log('updateBoard', updatedBoardPopulate);
      return updatedBoardPopulate;
    }
    const saveBoardPopulate = await this.boardModel
      .findById(saveBoard._id)
      .populate('user');
    console.log('saveBoardPopulate', saveBoardPopulate);
    return saveBoardPopulate;
  }

  async pushLike(likeBoard: LikeBoardData) {
    let promises = [];
    console.log('isAlreadyLike', likeBoard.isAlreadyLike);
    let updatedBoard: BoardDocument;
    // リツイートかどうかによって判断
    // if (likeBoard.isRepost) {
    // promises= this.pushLikeRepostAlready(likeBoard)
    // } else {
    if (likeBoard.isAlreadyLike) {
      promises = this.pushLikeAlready(likeBoard);
    } else {
      promises = this.pushLikeYet(likeBoard);
    }
    // }
    await Promise.all(promises);
    updatedBoard = await this.boardModel
      .findById(likeBoard.bid)
      .populate('user')
      .populate('origin_board')
      .exec();
    updatedBoard = ((await this.userModel.populate(updatedBoard, {
      path: 'origin_board.user',
    })) as any) as BoardDocument;
    return updatedBoard;
  }

  pushLikeAlready(likeBoard: LikeBoardData): Promise<any>[] {
    let promises = [];
    const bid = likeBoard.origin_bid ? likeBoard.origin_bid : likeBoard.bid;
    promises.push(
      this.boardModel.updateOne(
        { _id: bid },
        {
          $pull: { like_users: { $in: likeBoard.uid } },
          $inc: { like_count: -1 },
        },
      ),
    );
    promises.push(
      this.userModel.updateOne(
        { _id: likeBoard.uid },
        {
          $pull: { like_boards: { $in: bid } },
          $inc: { like_boards_count: -1 },
        },
      ),
    );
    return promises;
  }

  pushLikeYet(likeBoard: LikeBoardData): Promise<any>[] {
    let promises = [];
    const bid = likeBoard.origin_bid ? likeBoard.origin_bid : likeBoard.bid;
    promises.push(
      this.boardModel.updateOne(
        { _id: bid },
        {
          $push: { like_users: likeBoard.uid as any },
          $inc: { like_count: 1 },
        },
      ),
    );
    promises.push(
      this.userModel.updateOne(
        { _id: likeBoard.uid },
        {
          $push: { like_boards: bid as any },
          $inc: { like_boards_count: 1 },
        },
      ),
    );
    return promises;
  }
}
