// import { Injectable } from 

import { Injectable } from "@nestjs/common";
import { BoardInterface } from "./boards.interface";
// import { BoardModel } from "./boards.model"

@Injectable()
export class BoardsService {
  private readonly boards: BoardInterface[] = [];

  create(board: BoardInterface) {
    this.boards.push(board)
  }

  getAll(): BoardInterface[] {
    return this.boards
  }
}