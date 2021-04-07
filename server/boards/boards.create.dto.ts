import * as mongoose from 'mongoose';

export class CreateBoardDto {
  _id?: mongoose.Types.ObjectId;
  body: string;
  user: string;
  timestamp: number;
  image?: string;
  // like_users?: string[];
  // like_count?: number;
  // reply_count?: number;
  // repost_count?: number;
  // full_repost_count?: number;
  // quote_post_count?: number;
  reply_to?: string;
  reply_to_users?: string[]
  // repost_bid?: string
}
