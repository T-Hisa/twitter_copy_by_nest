import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { BoardModel } from '../types/BoardModel';
import { CreateBoardInterface } from '../../types/boards.interface';
import { RouteProps } from '../types/RouteProps';

import { getBoardDetail } from '../actions';
import { displayTooltip } from '../utils';

interface BoardDetailProps extends RouteProps {
  getBoardDetail: any;
}

interface BoardDetailState {
  // body: string;
  // focusFlag: boolean;
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
    const uid = this.props.match.params.uid;
    const bid = this.props.match.params.bid;
    const boardDetail = await this.props.getBoardDetail(bid);
    this.setState({ boardDetail });
    this.renderBoardBody()
  }

  render() {
    return (
      <React.StrictMode>
        <div className="home-container">
          {this.renderHeader()}
          {this.renderBody()}
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
          <div id="board-body" />
          {this.state.boardDetail?.image && <img  src="" alt="" />}
          <div className="detail-info">
            <span className="time-display">
              {this.displayDetailTime(this.state.boardDetail?.timestamp)}
            </span>
            ・
          </div>
        </div>
        <div className="board-info">
          {/* <span className="tweet-type">{this.state.boardDetail?.tweetType}</span> */}
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

  renderBoardBody() {
    const board = this.state.boardDetail
    let text = board.body.replace(/\n/g, '<br/>');
    let matchWords = text.match(
      /https?:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*?\.(com|co|jp|es)/,
    );
    if (matchWords) {
      const matchWord = matchWords[0];
      let genAnchorTag = `
        <a
          href=${matchWord}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          class="match"
          title=${matchWord}
        >
          ${matchWord}
        </a>
      `;
      text = text.replace(matchWord, genAnchorTag);
    }
    // let bodyEl: HTMLDivElement;
    let  bodyEl = document.getElementById('board-body') as HTMLDivElement;
    if (bodyEl) {
      bodyEl.innerHTML = text;
    }
  };

  onClickBackBtn() {
    this.props.history.go(-1);
  }

  displayDetailTime(timestamp: number) {
    const displayDate = new Date(timestamp);
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth() + 1;
    const day = displayDate.getDate();
    let hour = displayDate.getHours();
    const minutes = `0${displayDate.getMinutes()}`.slice(-2);
    let hourPrefix = '午前';
    console.log('year', year);
    console.log('month', month);
    console.log('day', day);
    console.log('hour', hour);
    console.log('minute', minutes);
    if (hour > 12) {
      hour -= 12;
      hourPrefix = '午後';
    }
    return `${hourPrefix}${hour}:${minutes}・${year}年${month}月${day}日`;
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
