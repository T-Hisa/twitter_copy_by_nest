import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { Board, BoardDocument, BoardSchema } from './board.schema';
import { CreateBoardDto } from './boards.create.dto';

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
    const allBoardObject = await this.boardModel.find().exec()
    console.log('allBoardObject', allBoardObject)
    const loginUser = await this.userModel.findById(id).exec();
    const following_user_ids = [loginUser._id, ...loginUser.following_userids];
    // const promises = []
    const boardsForHomeDisplay = await this.boardModel
      .find({
        $and: [
          { user: { $in: following_user_ids } },
          { reply_to: { $exists: false } },
          { body: { $exists: true } },
        ],
      })
      .sort({ timestamp: -1 })
      .skip(0)
      .limit(10)
      .populate('user')
      .exec();
    return boardsForHomeDisplay;
  }
}
