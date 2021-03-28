import * as mongoose from 'mongoose';

export class CreateBoardDto {
  _id: mongoose.ObjectId;
  body: string;
  user: string;
  date: Date;
  image?: string;
}
