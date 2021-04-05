import {
  GET_BOARDS,
  CREATE_BOARD,
  GET_BOARDS_FOR_HOME,
  GET_DETAIL_BOARD,
  REPLY_BOARD
} from '..//actions';

import { BoardModel } from '../types/BoardModel';

export const boards = (boardsModel: BoardModel[] = [], action: any) => {
  switch (action.type) {
    case GET_BOARDS:
      return action.data;
    case CREATE_BOARD:
      console.log('action', action);
      if (action.data) boardsModel.unshift(action.data);
      return boardsModel;
    case REPLY_BOARD:
      console.log('replyaction!!!!', action)
      if (action.data) {
        const updatedBoard = action.data
        console.log('updatedBoard!', updatedBoard)
        const replyBoardIndex = boardsModel.findIndex(board => board._id === updatedBoard._id)
        console.log('replyBoardIndex', replyBoardIndex)
        boardsModel.splice(replyBoardIndex, 1, updatedBoard)
        console.log('boardMdel updated!', boardsModel)
      }
      return boardsModel
    case GET_BOARDS_FOR_HOME:
      return action.data;
    case GET_DETAIL_BOARD:
    default:
      return boardsModel;
  }
};

// export const boardDetail = (board: any = {}, action: any) => {
//   switch (action.type) {
//     case GET_DETAIL_BOARD:
//       const { data } = action;
//       console.log('actiono', action);
//       console.log('data', data);
//       return data;
//     default:
//       return null;
//   }
// };
