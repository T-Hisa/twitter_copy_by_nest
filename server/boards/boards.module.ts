import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './board.schema';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { User, UserSchema } from '../users/user.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [],
})
export class BoardModule {}
