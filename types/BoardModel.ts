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
  like_user_ids?: string[]
  repost_user_ids?: string[]
  origin_board?: BoardModel
  reply_user_ids: string[]
}