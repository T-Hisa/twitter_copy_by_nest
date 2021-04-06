export interface CreateBoardInterface {
  body: string
  user: string
  timestamp: number
  reply_to?: string
  reply_to_userids?: string[]
}