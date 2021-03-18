// import { IsArray, IsString, Length, MinLength } from "class-validator";
// import { Entity } from "typeorm";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Board } from './board.schema';

// @Entity()
// export class UserEntity {
//   @IsString()
//   @Length(4, 10)
//   id: string
//   @MinLength(6)
//   password: string

//   @IsArray()
//   following_userids: string[]
//   @IsArray()
//   @IsString()
//   follower_userids: string[]

//   @IsArray()
//   board_ids: number[]
//   @IsArray()
//   repost_board_ids: number[]
//   @IsArray()
//   like_board_ids: number[]
// }

// export const UserSchema = new mongoose.Schema({
//   id: String,
//   username: string,
//   password: String,
// });

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
