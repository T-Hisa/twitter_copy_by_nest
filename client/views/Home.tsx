import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { BoardModel } from '../types/BoardModel';
import { createBoard } from '../actions';
import { CreateBoardInterface } from '../../types/boards.interface';
import { getBoardsForHome } from '../actions';
import BoardComponent from '../components/home/Board';

import { displayTooltip } from '../utils';

interface HomeProps {
  boards?: BoardModel[];
  createBoard: any;
  login_user: any;
  getBoardsForHome: any;
}

interface HomeState {
  body: string;
  focusFlag: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  tweetBtnRef: React.RefObject<HTMLAnchorElement>;

  constructor(props: HomeProps) {
    super(props);
    this.textareaRef = React.createRef();
    this.tweetBtnRef = React.createRef();
    this.props.getBoardsForHome();
    this.state = {
      body: '',
      focusFlag: false,
    };
  }

  render(): JSX.Element {
    return (
      <div className="home-container">
        {this.renderHeader()}
        {this.renderTweet()}

        {/* 空白を入れる */}
        <div className="empty-zone" />

        {this.props.boards.map((board) => (
          <BoardComponent
            board={board}
            login_user={this.props.login_user}
            key={board._id}
          />
        ))}
      </div>
    );
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
            onFocus={this.onFocusTextarea.bind(this)}
            placeholder="いまどうしてる?"
            rows={1}
          ></textarea>

          {this.state.focusFlag && this.renderTag()}

          {this.renderTweetMenu()}
        </div>
      </div>
    );
  }

  renderTweetMenu(): JSX.Element {
    return (
      <div className="d-flex tweet-select-wrapper">
        <ul className="d-flex tweet-select-list">
          <li
            className="icon-wrapper"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('media')}
          >
            <i className="far fa-image icon"></i>
          </li>
          <li
            className="icon-wrapper"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('gif')}
          >
            <i className="far fa-file-image icon"></i>
          </li>
          <li
            className="icon-wrapper"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('questionnare')}
          >
            <i className="fas fa-poll-h icon"></i>
          </li>
          <li
            className="icon-wrapper"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('face')}
          >
            <i className="far fa-grin icon"></i>
          </li>
          <li
            className="icon-wrapper"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('schedule')}
          >
            <i className="far fa-calendar icon"></i>
          </li>
        </ul>
        <a
          onClick={this.onClickTweet.bind(this)}
          className="send-tweet-btn bg-primary disabled"
          ref={this.tweetBtnRef}
        >
          ツイートする
        </a>
      </div>
    );
  }

  renderTag(): JSX.Element {
    return (
      <span className="tweet-tag">
        <i className="fas fa-volleyball-ball"></i>{' '}
        <span className="tag-text">全員が返信できます</span>
      </span>
    );
  }

  onInputTextarea(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    const body: string = e.currentTarget.value;
    const textarea: HTMLTextAreaElement = this.textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    this.setState({ body });
    this.controlTweetBtn({ body });
  }

  onFocusTextarea(): void {
    this.setState({ focusFlag: true });
  }

  controlTweetBtn(data: { body: string }) {
    const tweetBtn = this.tweetBtnRef.current;
    const { body } = data;
    if (body.trim()) {
      tweetBtn.className = 'send-tweet-btn bg-primary';
    } else {
      tweetBtn.className = 'send-tweet-btn bg-primary disabled';
    }
  }

  onClickTweet(): void {
    if (this.state.body) {
      const data: CreateBoardInterface = {
        body: this.state.body,
        user: this.props.login_user._id,
        timestamp: Date.now(),
      };
      this.props.createBoard(data);
    } else {
      alert('投稿内容を入力してください');
    }
  }
}

const mapStateToProps = (state: any, props: any) => {
  // console.log('state!', state)
  const login_user = state.login_user;
  const boards = state.boards;
  return { boards, login_user };
};

const mapDispatchToProps = { createBoard, getBoardsForHome };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
