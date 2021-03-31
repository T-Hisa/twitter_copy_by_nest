import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { User, UserDocument, UserSchema } from "../users/user.schema";
import { Board, BoardDocument, BoardSchema } from "./board.schema";

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    // @InjectConnection() private connection: Connection
  ) {}

  async findAll(): Promise<any> {
    let boardsObject
    boardsObject = await this.boardModel.find().populate('user').exec()
    let options = {
      path: 'like_users'
    }
    boardsObject = await this.userModel.populate(boardsObject, options)
    return boardsObject
  }
}