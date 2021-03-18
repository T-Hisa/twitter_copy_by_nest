import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BoardSchema } from "./board.schema";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Board', schema: BoardSchema}])],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: []
})
export class BoardModule {}