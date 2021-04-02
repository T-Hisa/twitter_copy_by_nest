import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { BoardModel } from '../types/BoardModel';
import { CreateBoardInterface } from '../../types/boards.interface';
import { RouteProps } from '../types/RouteProps';

import { getBoardDetail } from '../actions';

interface BoardDetailProps extends RouteProps {
  boardDetail: any;
}

interface BoardDetailState {
  body: string;
  focusFlag: boolean;
}

class BoardDetail extends React.Component<any, any> {
  componentDidMount() {
    const bid = this.props.match.params.bid;
    console.log('boardDidMount!', bid);
    this.props.getBoardDetail(bid).then((boardDetail) => {
      console.log('boardDetail', boardDetail);
      this.setState({ boardDetail });
    });
  }

  render() {
    return (
      <React.StrictMode>
        <div>sample</div>
      </React.StrictMode>
    );
  }
}

const mapStateToProps = (state: any, props: any) => {
  // ('state!', state)
  const login_user = state.login_user;
  const bid = props.match.params.id;
  // const board = state.board
  // for (let board of state.boards) {
  //   console.log('board.body', board.body)
  // }
  const boards = state.boards;
  return { boards, login_user };
};

const mapDispatchToProps = { getBoardDetail };

export default connect(null, mapDispatchToProps)(BoardDetail);
