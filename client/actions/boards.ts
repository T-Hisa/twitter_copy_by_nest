import axios from 'axios';
import { commonFunc, commonErrorFunc } from '../axiosCommon';
import { BoardModel } from '../types/BoardModel';

export const GET_BOARDS = 'GET_BOARDS';
export const CREATE_BOARD = 'CREATE_BOARD';
export const GET_BOARDS_FOR_HOME = 'GET_BOARDS_FOR_HOME';
export const GET_DETAIL_BOARD = 'GET_DETAIL_BOARD';
export const REPLY_BOARD = 'REPLY_BOARD'

export const getBoards = () => (dispatch: any) => {
  axios.post('get-boards').then((res) => {
    dispatch({ type: GET_BOARDS, data: res.data });
  });
};

export const createBoard = (sendData: any) => async (
  dispatch: any,
  state: any,
) => {
  try {
    const receiveData = await commonFunc('/create-board', sendData);
    console.log('receiveData at createBoard action', receiveData)
    const data: BoardModel = receiveData?.data;
    console.log('data', data)

    if (data.reply_count) {
      dispatch({ type: REPLY_BOARD, data });
    } else {
      dispatch({ type: CREATE_BOARD, data });
    }
  } catch (e) {
    commonErrorFunc(dispatch);
  }
};

export const getBoardsForHome = () => async (dispatch: any, state: any) => {
  // const token = state().login_user.access_token;
  const { data } = await commonFunc('/get-boards-for-home-display');
  dispatch({ type: GET_BOARDS_FOR_HOME, data });
};

export const getBoardDetail = (bid: string) => async (dispatch: any) => {
  const reqData = { bid };
  const { data } = await commonFunc('/get-board-detail', reqData);
  if (data) {
    return data;
  } else {
    commonErrorFunc(dispatch);
  }
};
