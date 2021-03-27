import axios from 'axios';

export const GET_BOARDS = 'GET_BOARDS';

export const getBoards = (data: any): any => (dispatch: any) => {
  axios.post('get-boards').then((res) => {
    dispatch({ type: GET_BOARDS, data: res.data });
  });
};
