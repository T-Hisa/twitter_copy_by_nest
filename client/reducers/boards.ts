import { GET_BOARDS } from '..//actions';

export const boards = (boardsModel: any = {}, action: any) => {
  switch (action.type) {
    case GET_BOARDS:
      console.log('a');
      return action.data
      return {};
    default:
      return {};
  }
};
