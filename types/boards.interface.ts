import * as mongoose from 'mongoose'
export interface CreateBoardInterface {
  body: string
  // user: mongoose.ObjectId
  user: string
  image?: File
  timestamp: number
}