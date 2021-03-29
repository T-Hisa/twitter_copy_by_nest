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

  @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  user: User;

  @Prop()
  image: string

  @Prop([{ type: mongoose.Schema.Types.String, ref: 'User' }])
  like_users: User[];

  @Prop({ required: true, default: 0 })
  like_count: number;

  @Prop({ required: true })
  date: number;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
