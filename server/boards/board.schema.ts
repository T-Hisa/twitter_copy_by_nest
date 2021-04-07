import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';

export type BoardDocument = Board & mongoose.Document;

@Schema()
export class Board {
  @Prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  body: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'User', required: true })
  user: User;

  @Prop()
  image: string;

  @Prop([{ type: mongoose.Schema.Types.String, ref: 'User' }])
  like_users: User[];

  @Prop()
  like_count: number;

  @Prop({ required: true })
  timestamp: number;

  @Prop()
  reply_to: mongoose.Schema.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }])
  reply_boards: Board[]

  @Prop()
  reply_count: number;

  @Prop()
  full_repost_count: number

  @Prop()
  repost_count: number

  @Prop()
  quote_post_count: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  origin_board: Board

  @Prop()
  origin_timestamp: number;

  @Prop([{type: mongoose.Schema.Types.String, ref: 'User'}])
  reply_to_users: User[]

  @Prop()
  tweet_type: string
}

export const BoardSchema = SchemaFactory.createForClass(Board);
