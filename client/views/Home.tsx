import * as React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBoardsForHome } from '../actions';

import BoardComponent from '../components/Board';
import TweetModal from '../components/TweetModal';
import SendTweet from '../components/SendTweet';

import { BoardModel, RouteProps } from '../../types';

interface HomeProps extends RouteProps {
  boards?: BoardModel[];
  login_user: any;
  getBoardsForHome: any;
  handleRedraw: () => {};
}

interface HomeState {
  body: string;
  focusFlag: boolean;

  controlReplyModal: boolean;
  selectedBoard?: BoardModel;
  redrawFlag: number;

  repost_bid: string
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
      repost_bid: ''
    };
  }

  render(): JSX.Element {
    return (
      <React.StrictMode>
        <div className="home-container">
          <div className="home-content">
            <SendTweet
              isNotReply={true}
              isModal={false}
              handleRedraw={this.props.handleRedraw}
            />

            {/* 空白を入れる */}
            <div className="empty-zone" />

            {this.props.boards.map((board) => (
              <BoardComponent
                board={board}
                login_user={this.props.login_user}
                handleClickReply={this.handleClickReply.bind(this)}
                key={board._id}
                handleRedraw={this.props.handleRedraw}
              />
            ))}
          </div>
          {/* z-indexで前に出してしまうと、MOdal 表示に主張してしまうので、最後に追加。 */}
          {this.renderHeader()}
        </div>
        <TweetModal
          isOpen={this.state.controlReplyModal}
          handleCloseModal={this.handleCloseModal.bind(this)}
          board={this.state.selectedBoard}
          repost_bid={this.state.repost_bid}
          ref={this.modalRef}
          isNotReply={false}
          handleRedraw={this.props.handleRedraw}
        />
      </React.StrictMode>
    );
  }

  renderHeader(): JSX.Element {
    return <div className="home-header">ホーム</div>;
  }

  handleClickReply(board: BoardModel) {
    let setBoard = board;
    console.log('handleClickReply At Home', board)
    if (board.origin_board && !board.body) {
      setBoard = board.origin_board;
      this.setState({ repost_bid: board._id })
    }
    this.setState({ selectedBoard: setBoard });
    this.setState({ controlReplyModal: true });
  }

  handleCloseModal() {
    this.setState({ controlReplyModal: false });
  }
}

const mapStateToProps = (state: any, props: any) => {
  const login_user = state.login_user;
  const boards = state.boards;
  console.log('state at Home,', state);
  return { boards, login_user };
};

const mapDispatchToProps = { getBoardsForHome };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
