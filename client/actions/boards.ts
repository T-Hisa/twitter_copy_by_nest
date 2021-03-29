import axios from 'axios';
import { commonFunc } from '../axiosCommon';

export const GET_BOARDS = 'GET_BOARDS';
export const CREATE_BOARD = 'CREATE_BOARD';
export const GET_BOARDS_FOR_HOME = 'GET_BOARDS_FOR_HOME';

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
  const token = state().login_user.access_token;
  const { data } = await commonFunc('create-board', token, sendData);
  // if (state().login_user?.access_token) {
  //   try {
  //     const { data } = await axios.post(
  //       'create-board',
  //       sendData,
  //       options(token),
  //     );
  dispatch({ type: CREATE_BOARD, data });
  //   } catch (e) {
  //     alert('予期せぬエラーが発生しました。再度ログインし直してください。');
  //   }
  // } else {
  //   alert('ログインしてください');
  // }
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

export const getBoardsForHome = () => async (dispatch: any, state: any) => {
  const token = state().login_user.access_token;
  const { data } = await commonFunc('get-boards-for-home-display', token);
  dispatch({ type: GET_BOARDS_FOR_HOME, data });
};
