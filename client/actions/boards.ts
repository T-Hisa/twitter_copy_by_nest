import axios from 'axios';
import options from '../axiosOption';

export const GET_BOARDS = 'GET_BOARDS';
export const CREATE_BOARD = 'CREATE_BOARD';

export const getBoards = () => (dispatch: any) => {
  axios.post('get-boards').then((res) => {
    dispatch({ type: GET_BOARDS, data: res.data });
  });
};

export const createBoard = (sendData: any) => async (
  dispatch: any,
  state: any,
) => {
  console.log('createBoard', sendData);
  console.log('state', state());
  if (state().login_user?.access_token) {
    const token = state().login_user.access_token;
    try {
      const { data } = await axios.post(
        'create-board',
        sendData,
        options(token),
      );
      dispatch({ type: CREATE_BOARD, data });
    } catch (e) {
      alert('予期せぬエラーが発生しました。再度ログインし直してください。');
    }
  } else {
    alert('ログインしてください');
  }
  // const options = {
  //   method: 'POST',
  //   headers: {'authorization-bearer': state().login_user.access_token},
  //   data,
  //   url: 'create-board'
  // }
  // axios.post('create-board', data).then(res => {
  //   console.log('response', res)
  //   dispatch({ type: CREATE_BOARD })
  // }).catch(() => {
  //   dispatch({ type: CREATE_BOARD })
  // })
};

export const getBoardsForHome = async (dispatch: any) => {
  axios.post('get-boards-for-home-display');
};
