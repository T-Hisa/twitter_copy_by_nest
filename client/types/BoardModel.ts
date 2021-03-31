import { UserModel } from "./UserModel"

export interface BoardModel {
  _id: string
  body: string
  user: UserModel
  image?: string
  like_user_ids?: string[]
  repost_user_ids?: string[]
  like_count: number
  timestamp: number
  reply_count: number
  reply_to: string
  repost_count: number
  origin_board?: BoardModel
}