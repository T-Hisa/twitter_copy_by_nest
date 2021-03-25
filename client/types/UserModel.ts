export interface UserModel {
  id: string
  thumbnail?: File
  following_userid?: string[]
  follower_userid?: string[]
  board_ids?: string[]
  repost_board_ids?: string[]
  like_board_ids?: string[]
}