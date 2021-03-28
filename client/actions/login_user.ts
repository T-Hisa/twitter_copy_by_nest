import axios from 'axios';

export const LOGIN = 'LOGIN';

export const login = (data: any) => async (dispatch: any) => {
  console.log('data', data);
  // request パラメータは、{ username: , password: } の形式ではないとダメなので便宜的にこうする
  const sendData = {
    username: data._id,
    password: data.password
  }
  const user = await axios.post('login', sendData);
  console.log('response user', user)
  dispatch({ type: LOGIN });
};
