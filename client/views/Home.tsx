import * as React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBoardsForHome } from '../actions';

import BoardComponent from '../components/Board';
import Modal from '../components/Modal';
import Tweet from '../components/Tweet';

import { BoardModel } from '../types/BoardModel';
import { RouteProps } from '../types/RouteProps';

interface HomeProps extends RouteProps {
  boards?: BoardModel[];
  login_user: any;
  getBoardsForHome: any;
}

interface HomeState {
  body: string;
  focusFlag: boolean;

  controlReplyModal: boolean;
  selectedBoard?: BoardModel;
  redrawFlag: number;
}

class Home extends React.Component<HomeProps, HomeState> {
  modalRef: React.RefObject<any>;

  constructor(props: HomeProps) {
    super(props);
    this.modalRef = React.createRef();
    this.props.getBoardsForHome();
    this.state = {
      body: '',
      focusFlag: false,
      controlReplyModal: false,
      redrawFlag: 0,
    };
  }

  render(): JSX.Element {
    return (
      <React.StrictMode>
        <div className="home-container">
          {this.renderHeader()}
          <Tweet
            isNotReply={true}
            isModal={false}
            handleRedraw={this.handleRedrawFlag.bind(this)}
          />

          {/* 空白を入れる */}
          <div className="empty-zone" />

          {this.props.boards.map((board) => (
            <BoardComponent
              board={board}
              login_user={this.props.login_user}
              handleClickReply={this.handleClickReply.bind(this)}
              key={board._id}
            />
          ))}
        </div>
        <Modal
          isOpen={this.state.controlReplyModal}
          handleCloseModal={this.handleCloseModal.bind(this)}
          board={this.state.selectedBoard}
          ref={this.modalRef}
        />
      </React.StrictMode>
    );
  }

  renderHeader(): JSX.Element {
    return <div className="home-header">ホーム</div>;
  }

  handleClickReply(board: BoardModel) {
    let setBoard = board
    if (board.origin_board && !board.body) {
      setBoard = board.origin_board
    }
    this.setState({ selectedBoard: setBoard });
    this.setState({ controlReplyModal: true });
  }

  handleCloseModal() {
    this.setState({ controlReplyModal: false });
  }

  handleRedrawFlag() {
    const redrawFlag = this.state.redrawFlag + 1;
    this.setState({ redrawFlag });
  }
}

const mapStateToProps = (state: any, props: any) => {
  const login_user = state.login_user;
  const boards = state.boards;
  console.log('state at Home', state);
  return { boards, login_user };
};

const mapDispatchToProps = { getBoardsForHome };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
