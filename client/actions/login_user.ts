import axios from 'axios';

export const LOGIN = 'LOGIN';

export const login = (data: any) => async (dispatch: any) => {
  console.log('data', data);
  const user = await axios.post('login', data);
  dispatch({ type: LOGIN });
};
