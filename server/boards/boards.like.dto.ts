import * as mongoose from "mongoose";

export class BoardLikeDto {
  _id: mongoose.Types.ObjectId;
  like_users: string[]
  isAlreadyLike: boolean
}