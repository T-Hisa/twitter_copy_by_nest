import { Module } from "@nestjs/common";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
// import { SampleModule } from "./sample.module";

@Module({
  imports: [],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: []
})
export class BoardModule {}