import { LOGIN, RELOAD, LOGOUT,ERROR } from '../actions';

export const login_user = (loginUserModel: any = null, action: any) => {
  let user;
  switch (action.type) {
    case LOGIN:
    case RELOAD:
      const access_token = action.data.access_token;
      user = action.data.user;
      localStorage.setItem('token', access_token);
      // const login_user = { access_token, ...user };
      return user;
    case LOGOUT:
    case ERROR:
      localStorage.removeItem('token');
      return null
    default:
      // access_token = loginUserModel.access_token;
      if (action?.data?.access_token) {
        // access_token = action.data.access_token;
        localStorage.setItem('token', action.data.access_token);
      }
      // return { access_token, ...loginUserModel };
      return loginUserModel
  }
};
