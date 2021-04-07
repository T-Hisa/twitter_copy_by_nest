import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { BoardModel, RouteProps } from '../../types';

import { getBoardDetail } from '../actions';
import { displayTooltip, renderBoardBody, displayDate } from '../utils';

interface BoardDetailProps extends RouteProps {
  getBoardDetail: any;
}

interface BoardDetailState {
  boardDetail?: BoardModel;
}

class BoardDetail extends React.Component<BoardDetailProps, BoardDetailState> {
  constructor(props) {
    super(props);
    this.state = {
      boardDetail: null,
    };
  }

  async componentDidMount() {
    // const uid = this.props.match.params.uid;
    const bid = this.props.match.params.bid;
    const boardDetail = await this.props.getBoardDetail(bid);
    console.log('boardDetail', boardDetail);
    this.setState({ boardDetail });
    renderBoardBody(boardDetail.body, boardDetail._id, false);
  }

  render() {
    return (
      <React.StrictMode>
        <div className="home-container">
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderActivity()}
          {this.renderMenu()}
        </div>
      </React.StrictMode>
    );
  }

  renderHeader() {
    return (
      <div className="home-header">
        <span
          onClick={this.onClickBackBtn.bind(this)}
          className="left-arrow-container"
        >
          <i className="fas fa-arrow-left"></i>
        </span>
        <span className="detail-header-word">ツイートする</span>
      </div>
    );
  }

  renderBody() {
    return (
      <div className="home-content">
        {this.renderUserInfo()}
        <div className="detail-body">
          <div id={`body-${this.state.boardDetail?._id}`} />
          {this.state.boardDetail?.image && <img src="" alt="" />}
          {this.state.boardDetail?.origin_board &&
            this.renderQuote(this.state.boardDetail.origin_board)}
          <div className="detail-info">
            <span className="information">
              {this.displayDetailTime(this.state.boardDetail?.timestamp)}
            </span>
            ・
            <span className="information">{this.displayTweetType(this.state.boardDetail?.tweet_type)}</span>
          </div>
        </div>
      </div>
    );
  }

  renderUserInfo() {
    return (
      <div className="detail-content-header board-header">
        <div className="detail-userinfo-wrapper">
          <div className="thumbnail-wrapper">
            <img className="thumbnail" src="" alt="サム" />
          </div>
          <div className="detail-userinfo">
            <span className="username">
              {this.state.boardDetail?.user?.username}
            </span>
            <span className="userid">@{this.state.boardDetail?.user?._id}</span>
          </div>
        </div>
        <div
          className="icon-wrapper  more-btn"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={displayTooltip('more')}
        >
          <i className="fas fa-ellipsis-h icon"></i>
        </div>
      </div>
    );
  }

  renderActivity() {
    return (
      <div className="detail-activity">
        <i className="fas fa-chart-bar icon common"></i>
        <span className="activity-word">ツイートアクティビティを表示</span>
      </div>
    );
  }

  renderMenu() {
    return (
      <ul className="detail-board-menu">
        <li className="detail-board-menu-wrapper">
          <div
            className="icon-wrapper common"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('reply')}
          >
            <i className="far fa-comment icon"></i>
          </div>
        </li>
        <li className="detail-board-menu-wrapper">
          <div
            className="icon-wrapper repost"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('repost')}
          >
            <i className="fas fa-retweet icon"></i>
          </div>
        </li>
        <li className="detail-board-menu-wrapper">
          <div
            className="icon-wrapper like"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('like')}
          >
            <i className="far fa-heart icon"></i>
          </div>
        </li>
        <li className="detail-board-menu-wrapper">
          <div
            className="icon-wrapper common share"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('share')}
          >
            <i className="fas fa-share icon common"></i>
          </div>
        </li>
      </ul>
    );
  }

  renderQuote(board: BoardModel) {
    return (
      <div className="quote-wrapper detail">
        <div className="quote-content-wrapper">
          <div className="quote-user-info-wrapper">
            <img className="quote-thumbnail" src="" alt="画像" />
            <span className="quote-username">{board?.user?.username}</span>
            <span className="c-gray quote-userid">@{board?.user?._id}</span>
            <span className="quote-dot">・</span>
            <span className="c-gray quote-time">
              {displayDate(board?.timestamp)}
            </span>
          </div>
          <div className="quote-content">
            {board?.body}
            {board?.image && <img src="" alt="投稿した画像" />}
          </div>
        </div>
      </div>
    );
  }

  onClickBackBtn() {
    this.props.history.go(-1);
  }

  displayDetailTime(timestamp: number) {
    const displayDateTime = new Date(timestamp);
    const year = displayDateTime.getFullYear();
    const month = displayDateTime.getMonth() + 1;
    const day = displayDateTime.getDate();
    let hour = displayDateTime.getHours();
    const minutes = `0${displayDateTime.getMinutes()}`.slice(-2);
    let hourPrefix = '午前';
    if (hour > 12) {
      hour -= 12;
      hourPrefix = '午後';
    }
    return `${hourPrefix}${hour}:${minutes}・${year}年${month}月${day}日`;
  }
  
  displayTweetType(tweetType: string) {
    switch(tweetType) {
      case 'web':
        return 'Twitter Web App'
      default:
      }
    return '対応していません'
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
