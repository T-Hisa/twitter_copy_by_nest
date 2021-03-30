import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { BoardModel } from '../types/BoardModel';
import { createBoard } from '../actions';
import { CreateBoardInterface } from '../../types/boards.interface';
import { getBoardsForHome } from '../actions';

interface HomeProps {
  boards?: BoardModel[];
  createBoard: any;
  login_user_for_home: any;
  getBoardsForHome: any;
}

class Home extends React.Component<HomeProps, any> {
  textareaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: any) {
    super(props);
    this.textareaRef = React.createRef();
    this.props.getBoardsForHome();
  }

  getBoards() {}

  onInputTextarea(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    const body: string = e.currentTarget.value;
    const textarea: HTMLTextAreaElement = this.textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    this.setState({ body });
  }

  onClickSample(e: any) {
    console.log('props', this.props);
  }

  onClickTweet(e: React.MouseEvent<HTMLAnchorElement>): void {
    const data: CreateBoardInterface = {
      body: 'sample',
      user: 'sample-id',
      timestamp: Date.now(),
    };
    this.props.createBoard(data);
    // window.location.href = 'http://localhost:3000/create-board'
  }

  displayDate(timestamp: number) {
    const now = Date.now()
    const subtraction = now - timestamp
    switch (true) {
      case subtraction < 1000:
        return '現在'
      case subtraction < 60000:
        const sec = Math.floor(subtraction / 1000)
        return `${sec}秒前`
      case subtraction < 3600000:
        const minutes = Math.floor(subtraction / 60000)
        return `${minutes}分`
      case subtraction < 86400000:
        const hour = Math.floor(subtraction / 3600000)
        return `${hour}時間`
      case subtraction < 172800000:
        return '昨日'
      case subtraction < 259200000:
        return '2日前'
      default:
        const nowDate = new Date(now)
        const date = new Date(timestamp)
        const nowYear = `${nowDate.getFullYear()}`
        const boardYear = `${date.getFullYear()}`
        const boardMonth = `${date.getMonth() + 1}`
        const boardDay = `${date.getDate()}`
        const commonWord = `${boardMonth}月${boardDay}日`
        const displayWord = nowYear === boardYear
          ? `${boardYear}年${commonWord}`
          : commonWord
        return displayWord
    }
  }

  renderHeader(): JSX.Element {
    return <div className="home-header">ホーム</div>;
  }

  renderTweet(): JSX.Element {
    return (
      <div className="home-tweet-wrapper">
        <img className="thumbnail" src="" alt="サムネイル" />
        <div className="home-tweet">
          <textarea
            className="tweet-textarea"
            name="tweet"
            id="tweet"
            ref={this.textareaRef}
            onInput={this.onInputTextarea.bind(this)}
            placeholder="いまどうしてる?"
            rows={1}
          ></textarea>
          <span className="tweet-tag">
            <i className="fas fa-volleyball-ball"></i>{' '}
            <span className="tag-text">全員が返信できます</span>
          </span>
          <div className="d-flex tweet-select-wrapper">
            <ul className="d-flex tweet-select-list">
              <li>
                <i className="far fa-image"></i>
              </li>
              <li>
                <i className="far fa-file-image"></i>
              </li>
              <li>
                <i className="fas fa-poll-h"></i>
              </li>
              <li>
                <i className="far fa-grin"></i>
              </li>
              <li>
                <i className="far fa-calendar"></i>
              </li>
            </ul>
            <a
              onClick={this.onClickTweet.bind(this)}
              className="send-tweet-btn bg-primary"
            >
              ツイートする
            </a>
            <a onClick={this.getBoards.bind(this)}>更新</a>
            <a onClick={this.onClickSample.bind(this)}>取得</a>
          </div>
        </div>
      </div>
    );
  }

  renderBoard(board: BoardModel): JSX.Element {
    return (
      <div className="board-wrapper" key={board._id}>
        {/* board.user.thumbnail */}
        <div className="board-thumbnail-wrapper">
          <img className="board-thumbnail" src="" alt="サムネイル" />
        </div>
        <div className="board-content-wrapper">
          <div className="user-info-wrapper">
            <span className="username">{board.user.username}</span>
            <span className="userid">@{board.user._id}</span>
            <span className="dot">・</span>
            <span className="time-display">
              {this.displayDate(board.timestamp)}
            </span>
          </div>
          <div className="board-content">
            {board.body}
            {board.iamge && <img src="board.image" alt="投稿した画像" />}
          </div>
          <ul className="board-menu">
            <li className="comment-wrapper">
              <i className="far fa-comment"></i>
            </li>
            <li className="retweet-wrapper">
              <i className="fas fa-retweet"></i>
            </li>
            <li className="heart-wrapper">
              <i className="far fa-heart"></i>
            </li>
            <li className="share-wrapper">
              <i className="fas fa-share"></i>
            </li>
            <li className="chart-wrapper">
              <i className="fas fa-chart-bar"></i>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <div className="home-container">
        {this.renderHeader()}
        {this.renderTweet()}
        <div className="empty-zone" />
        {this.props.boards.map((board) => this.renderBoard(board))}
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => {
  console.log('props', props);
  console.log('state', state);
  console.log('state.login_user', state.login_user);
  console.log('state.login_user.boards', state.login_user.boards);
  const boards = state.boards;
  return { boards };
};

const mapDispatchToProps = { createBoard, getBoardsForHome };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
