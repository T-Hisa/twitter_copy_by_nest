import { LOGIN, RELOAD, LOGOUT,ERROR } from '../actions';

export const login_user = (loginUserModel: any = {}, action: any) => {
  let access_token, user;
  switch (action.type) {
    case LOGIN:
    case RELOAD:
      access_token = action.data.access_token;
      user = action.data.user;
      localStorage.setItem('token', access_token);
      const login_user = { access_token, ...user };
      return login_user;
    case LOGOUT:
    case ERROR:
      localStorage.removeItem('token');
      return {}
    default:
      access_token = loginUserModel.access_token;
      if (action?.data?.access_token) {
        access_token = action.data.access_token;
        localStorage.setItem('token', action.data.access_token);
      }
      return { access_token, ...loginUserModel };
  }
};
