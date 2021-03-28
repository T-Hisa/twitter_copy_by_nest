import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Board, BoardDocument, BoardSchema } from "./board.schema";
import { CreateBoardDto } from "./boards.create.dto";

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    // @InjectConnection() private connection: Connection
  ) {}

  async findAll(): Promise<Board[]> {
    const boardsObject = await this.boardModel.find().populate('user').exec()
    return boardsObject
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const createBoard = new this.boardModel(createBoardDto)
    console.log('create board now!', createBoard)
    return createBoard.save()
  }
}