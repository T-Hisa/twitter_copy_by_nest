import { LOGIN } from '../actions';

export const login_user = (loginUserModel: any = {}, action: any) => {
  switch (action.type) {
    case LOGIN:
      console.log('action', action);
      const access_token = { action };
      const login_user = { access_token, ...action.data.user };
      console.log('login_user', login_user);
      return action.data;
    default:
      console.log('defaultaction in loginUser');
      return loginUserModel;
  }
};
