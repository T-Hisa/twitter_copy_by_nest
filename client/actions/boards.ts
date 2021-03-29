import axios from 'axios';

export const GET_BOARDS = 'GET_BOARDS';
export const CREATE_BOARD = 'CREATE_BOARD';

export const getBoards = () => (dispatch: any) => {
  axios.post('get-boards').then((res) => {
    dispatch({ type: GET_BOARDS, data: res.data });
  });
};

export const createBoard = (data: any) => async (dispatch: any, state: any) => {
  console.log('createBoard', data)
  console.log('state', state())
  const options = {
    method: 'POST',
    headers: {'authorization-bearer': state().login_user.access_token},
    data,
    url: 'create-board'
  }
  const res = await axios.post('create-board', data)
  dispatch({ type: CREATE_BOARD })
  // axios.post('create-board', data).then(res => {
  //   console.log('response', res)
  //   dispatch({ type: CREATE_BOARD })
  // }).catch(() => {
  //   dispatch({ type: CREATE_BOARD })
  // })
}

export const getBoardsForHome = async (dispatch: any) => {
  axios.post('get-boards-for-home-display')
}