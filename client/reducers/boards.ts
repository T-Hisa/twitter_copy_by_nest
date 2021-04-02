import { GET_BOARDS, CREATE_BOARD, GET_BOARDS_FOR_HOME } from '..//actions';

export const boards = (boardsModel: any = [], action: any) => {
  switch (action.type) {
    case GET_BOARDS:
      console.log('GET_BOARDS::', action.data);
      return action.data;
    case CREATE_BOARD:
      boardsModel.unshift(action.data)
      return boardsModel
    case GET_BOARDS_FOR_HOME:
      console.log('GET_BOARDS_FOR_HOME', action.data)
      return action.data
    default:
      return boardsModel;
  }
};
