import axios from 'axios';

export const LOGIN = 'LOGIN';

export const login = (data: any) => async (dispatch: any) => {
  const user = await axios.post('login', data);
  console.log('user', user);
  dispatch({ type: LOGIN });
};
