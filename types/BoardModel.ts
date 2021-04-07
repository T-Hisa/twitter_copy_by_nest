import { UserModel } from "./UserModel"

export interface BoardModel {
  _id: string
  body: string
  user: UserModel
  like_count: number
  timestamp: number
  reply_count: number
  reply_to?: string
  repost_count: number
  full_repost_count: number
  image?: string
  like_users?: string[]
  repost_users?: string[]
  origin_board?: BoardModel
  reply_to_users: string[]
  tweet_type: string
  reply_boards: BoardModel[]
}