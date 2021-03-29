import axios from 'axios';

export const LOGIN = 'LOGIN';

interface responseProperty {
  data: any;
}

export const login = (data: any) => async (dispatch: any) => {
  console.log('data', data);
  // request パラメータは、{ username: , password: } の形式ではないとダメなので便宜的にこうする
  const sendData = {
    username: data._id,
    password: data.password,
  };
  const res: responseProperty = await axios.post('login', sendData);
  const receiveData = res.data;
  console.log('response user', res.data);
  dispatch({ type: LOGIN, data: receiveData });
};
