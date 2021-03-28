import { LOGIN } from '../actions'

export const user = (userModel: any = {}, action: any) => {
  switch (action.type) {
    case LOGIN:
      console.log('action', action)
      return userModel
    default:
      return userModel
  }
}