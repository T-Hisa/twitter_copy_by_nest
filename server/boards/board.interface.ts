export interface BoardInterface {
  _id: string
  body: string
  user: string
  timestamp: number
  image?: File
  like_users?: string[]
  like_count?: number
  reply_to?: string
  reply_count: number
  full_repost_count: number
  repost_count:number
  quote_post_count: number
  origin_board: string
  origin_timestamp: number
  reply_to_users: string[]
}