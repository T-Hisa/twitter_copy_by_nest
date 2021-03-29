import { LOGIN } from '../actions';

export const login_user = (loginUserModel: any = {}, action: any) => {
  switch (action.type) {
    case LOGIN:
      const { access_token, user } = action.data;
      const login_user = { access_token, ...user };
      return login_user;
    default:
      return loginUserModel;
  }
};
