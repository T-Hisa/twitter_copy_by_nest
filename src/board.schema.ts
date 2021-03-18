import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type BoardDocument = Board & mongoose.Document

@Schema()
export class Board {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  // _id: mongoose.ObjectId;
  @Prop({ required: true })
  id: string

  @Prop({ required: true })
  body: string;

  // @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  like_users: User[];
}

export const BoardSchema = SchemaFactory.createForClass(Board)
