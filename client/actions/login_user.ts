import axios from 'axios';

export const LOGIN = 'LOGIN';

interface responseProperty {
  data: any;
}

export const login = (data: any) => async (dispatch: any) => {
  const res: responseProperty = await axios.post('login', data);
  const receiveData = res.data;
  console.log('response user', res.data);
  dispatch({ type: LOGIN, data: receiveData });
};
