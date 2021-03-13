import { Controller, Get } from "@nestjs/common";
import { BoardsService } from "./boards.service";
// import { BoardModel } from "./boards.model"
// import { BoardInterface } from "./boards.interface"

@Controller('/')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  @Get()
  getBoards(): string {
    return 'this is board'
  }
}