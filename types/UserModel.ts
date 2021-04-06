export interface UserModel {
  _id: string
  username: string
  thumbnail?: string
  following_userid?: string[]
  follower_userid?: string[]
  board_ids?: string[]
  repost_board_ids?: string[]
  like_board_ids?: string[]
  repost_boards: string[]
}