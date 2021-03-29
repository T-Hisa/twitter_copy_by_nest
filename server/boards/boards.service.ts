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
    console.log('id', id)
    // const loginUser = (await this.userModel.find({_id: id}).exec())[0];
    const loginUser = await this.userModel.findById(id).exec();
    console.log('loginUser', loginUser);
    const following_user_ids = [loginUser._id, ...loginUser.following_userids];
    console.log('following_userids', following_user_ids);
    const boardsForHomeDisplay = await this.boardModel
      .find({ user: { $in: following_user_ids } })
      .sort({timestamp: -1})
      .skip(0)
      .limit(10)
      .exec();
    console.log('boardsForHomeDisplay', boardsForHomeDisplay)
    return boardsForHomeDisplay;
  }
}
