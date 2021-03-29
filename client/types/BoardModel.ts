import { UserModel } from "./UserModel"

export interface BoardModel {
  body: string
  user: UserModel
  iamge?: File
  like_user_ids?: string[]
  re_post_user_ids?: string[]
  timestamp: number
}