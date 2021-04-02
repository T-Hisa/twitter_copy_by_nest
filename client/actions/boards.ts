import axios from 'axios';
import { commonFunc, commonErrorFunc } from '../axiosCommon';

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
  const token = state().login_user.access_token;
  const receiveData = await commonFunc('create-board', token, sendData);
  const data = receiveData?.data
  if (data) {
    dispatch({ type: CREATE_BOARD, data });
  } else {
    commonErrorFunc(dispatch)
  }
};

export const getBoardsForHome = () => async (dispatch: any, state: any) => {
  const token = state().login_user.access_token;
  const { data } = await commonFunc('get-boards-for-home-display', token);
  dispatch({ type: GET_BOARDS_FOR_HOME, data });
};
