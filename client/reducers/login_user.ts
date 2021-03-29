import { LOGIN } from '../actions'

export const login_user = (loginUserModel: any = {}, action: any) => {
  switch (action.type) {
    case LOGIN:
      console.log('action', action)
      return action.data
    default:
      console.log('defaultaction in loginUser')
      return loginUserModel
  }
}