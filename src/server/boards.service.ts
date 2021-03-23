import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Board, BoardDocument } from "./board.schema";
// import { BoardInterface } from "./boards.interface";
// import { BoardModel } from "./boards.model"

@Injectable()
export class BoardsService {
  // private readonly boards: BoardInterface[] = [];
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    // @InjectConnection() private connection: Connection
  ) {}

  // create(board: BoardInterface) {
  //   this.boards.push(board)
  // }

  // getAll(): BoardInterface[] {
  //   return this.boards
  // }
  async findAll(): Promise<any> {
    return this.boardModel.find().exec()
  }
}