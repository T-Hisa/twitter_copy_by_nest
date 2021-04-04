import * as React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBoardsForHome } from '../actions';

import BoardComponent from '../components/Board';
import Modal from '../components/Modal';
import Tweet from '../components/Tweet'

import { BoardModel } from '../types/BoardModel';
import { RouteProps } from '../types/RouteProps';

import { displayTooltip } from '../utils';

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
    };
  }

  componentDidUpdate() {
    // console.log('props at Home', this.props);
  }

  render(): JSX.Element {
    return (
      <React.StrictMode>
        <div className="home-container">
          {this.renderHeader()}
          <Tweet
            isNotReply={true}
            isModal={false}
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
    console.log('replyClicked!!!');
    console.log('this.modalRef', this.modalRef);
    console.log('this.modalRef.current', this.modalRef.current);
    this.setState({ selectedBoard: board });
    // this.modalRef.current.props.board = board
    // this.modalRef.
    this.setState({ controlReplyModal: true });
  }

  handleCloseModal() {
    this.setState({ controlReplyModal: false });
  }
}

const mapStateToProps = (state: any, props: any) => {
  // ('state!', state)
  const login_user = state.login_user;
  // for (let board of state.boards) {
  //   console.log('board.body', board.body)
  // }
  const boards = state.boards;
  return { boards, login_user };
};

const mapDispatchToProps = { getBoardsForHome };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
