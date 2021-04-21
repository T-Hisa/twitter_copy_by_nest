import axios from 'axios';
import { commonFunc, commonErrorFunc } from '../axiosCommon';
import { BoardModel, CreateBoardInterface, LikeBoardData } from '../../types';

export const GET_BOARDS = 'GET_BOARDS';
export const CREATE_BOARD = 'CREATE_BOARD';
export const GET_BOARDS_FOR_HOME = 'GET_BOARDS_FOR_HOME';
export const GET_DETAIL_BOARD = 'GET_DETAIL_BOARD';
export const REPLY_BOARD = 'REPLY_BOARD';
export const PUSH_LIKE = 'PUSH_LIKE';
export const PUSH_LIKE_DETAIL = 'PUSH_LIKE_DETAIL'

export const getBoards = () => (dispatch: any) => {
  axios.post('get-boards').then((res) => {
    dispatch({ type: GET_BOARDS, data: res.data });
  });
};

export const createBoard = (createBoardData: CreateBoardInterface) => async (
  dispatch: any,
  state: any,
) => {
  console.log('sendData', createBoardData)
  try {
    const receiveData = await commonFunc('/create-board', createBoardData);
    console.log('receiveData at createBoard action', receiveData);
    const data: BoardModel = receiveData?.data;
    console.log('data', data);

    // reply_count のみでは、リツイートに返信した際にcatch 側に行ってしまうので、 body も含める
    if (data.reply_count || !data.body) {
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
  if (data) {
    dispatch({ type: GET_BOARDS_FOR_HOME, data });
  } else {
    commonErrorFunc(dispatch);
  }
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

export const clickLike = (sendData: LikeBoardData, isReply: boolean) => async (dispatch: any) => {
  const { data } = await commonFunc('/push-like', sendData);
  if (data) {
    if (isReply) {
      // ({ type: PUSH_LIKE_DETAIL, data })
      console.log('isDetail clickLike returnData', data)
      return data
    } else {
      dispatch({ type: PUSH_LIKE, data });
    }
  } else {
    commonErrorFunc(dispatch);
  }
};
