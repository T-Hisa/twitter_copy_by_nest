import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Board } from '../boards/board.schema';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  // _id: mongoose.ObjectId;

  @Prop({required: true})
  _id: string

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  // @Prop({ type: mongoose.Schema.Types.Number, ref: 'Board' })
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }])
  boards: Board[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }])
  repost_boards: Board[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }])
  like_boards: Board[];

  @Prop([String])
  following_userids: string[];
  // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  // users: User
}

export const UserSchema = SchemaFactory.createForClass(User);
