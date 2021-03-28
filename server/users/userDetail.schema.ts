import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Board } from '../boards/board.schema';

export type UserDetailDocument = UserDetail & mongoose.Document;

@Schema()
export class UserDetail {
  @Prop({required: true})
  _id: string

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }])
  boards: Board[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }])
  repost_boards: Board[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }])
  like_boards: Board[];

  @Prop([{type: mongoose.Schema.Types.String, ref: 'User'}])
  following_users: UserDetail[];

  @Prop({type: mongoose.Schema.Types.String, ref: 'User'})
  follower_users: UserDetail[];
  // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  // users: User
}

export const UserDetailSchema = SchemaFactory.createForClass(UserDetail);
