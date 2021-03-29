import axios from 'axios';

export const commonOption = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const commonFunc = async (url, token, data?) => {
  let receiveData;
  if (token) {
    try {
      receiveData = await axios.post(url, data, commonOption(token));
    } catch (e) {
      alert('予期せぬエラーが発生しました。再度ログインし直してください。');
    }
  } else {
    alert('ログインしてください');
  }
  return receiveData
};
