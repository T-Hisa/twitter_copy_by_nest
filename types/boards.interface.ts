export interface CreateBoardInterface {
  body: string
  user: string
  timestamp: number
  image?: string
  reply_to?: string
  reply_to_users?: string[]
  repost_bid?: string
}