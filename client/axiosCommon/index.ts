import axios from 'axios';
import { ERROR } from '../actions';

const options = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const commonFunc = async (url, data?) => {
  let receiveData;
  const token = localStorage.getItem('token')
  if (token) {
    try {
      receiveData = await axios.post(url, data, options(token));
    } catch (e) {
      localStorage.removeItem('token');
      alert('有効期限が過ぎました。再度ログインし直してください。');
      receiveData = null;
    }
  } else {
    alert('ログインしてください');
  }
  return receiveData;
};

export const commonErrorFunc = (dispatch) => {
  return dispatch({ type: ERROR });
};

// const postData = (url: string, token, data): any => {
//   try {
//     return axios.post(url, data, options(token))
//   } catch (e) {
//     alert('予期せぬエラーが発生しました。再度ログインし直してください。');
//   }
// }
