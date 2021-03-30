import axios from 'axios';

const options = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const commonFunc = async (url, token, data?) => {
  let receiveData;
  if (token) {
    try {
      receiveData = await axios.post(url, data, options(token));
    } catch (e) {
      alert('予期せぬエラーが発生しました。再度ログインし直してください。');
    }
  } else {
    alert('ログインしてください');
    axios.post('/logout')
  }
  return receiveData
};
