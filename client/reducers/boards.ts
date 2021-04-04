import {
  GET_BOARDS,
  CREATE_BOARD,
  GET_BOARDS_FOR_HOME,
  GET_DETAIL_BOARD,
} from '..//actions';

export const boards = (boardsModel: any = [], action: any) => {
  switch (action.type) {
    case GET_BOARDS:
      return action.data;
    case CREATE_BOARD:
      boardsModel.unshift(action.data);
      console.log('action', action)
      return boardsModel;
    case GET_BOARDS_FOR_HOME:
      return action.data;
    case GET_DETAIL_BOARD:
    default:
      console.log('action', action)
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
