import axios from 'axios';
import { commonFunc } from '../axiosCommon';

export const LOGIN = 'LOGIN';
export const RELOAD = 'RELOAD';
export const LOGOUT = 'LOGOUT';
export const ERROR = 'ERROR'

interface responseProperty {
  data: any;
}

export const login = (data: any) => async (dispatch: any) => {
  const res: responseProperty = await axios.post('login', data);
  const receiveData = res.data;
  dispatch({ type: LOGIN, data: receiveData });
};

export const reload = () => async (dispatch: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    const res: any = await commonFunc('reload', token);
    if (res) dispatch({ type: RELOAD, data: res.data })
  }
};

export const logout = () => {
  return { type: LOGOUT };
};
