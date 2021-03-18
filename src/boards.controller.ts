import { Controller, Get } from "@nestjs/common";
import { BoardsService } from "./boards.service";
// import { BoardModel } from "./boards.model"
// import { BoardInterface } from "./boards.interface"

@Controller('/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  @Get()
  getBoards(): any {
    const boards = this.boardsService.findAll()
    return boards
    // return 'this is board'
  }
}