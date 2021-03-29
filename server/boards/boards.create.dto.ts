import * as mongoose from 'mongoose';

export class CreateBoardDto {
  _id: mongoose.Types.ObjectId;
  body: string;
  user: string;
  timestamp: number;
  image?: string;
}
