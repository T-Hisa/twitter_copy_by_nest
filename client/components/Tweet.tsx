import * as React from 'react';

import { connect } from 'react-redux';

import { CreateBoardInterface } from '../../types/boards.interface';
import { displayTooltip } from '../utils';

import { createBoard } from '../actions';
import { UserModel } from '../types/UserModel';

interface TweetProps {
  isNotReply: boolean;
  createBoard: any;
  login_user: UserModel
  isModal: boolean
}

class Tweet extends React.Component<TweetProps, any> {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  tweetBtnRef: React.RefObject<HTMLAnchorElement>;

  constructor(props: any) {
    super(props);
    this.textareaRef = React.createRef();
    this.tweetBtnRef = React.createRef();
    this.state = {
      body: '',
      focusFlag: false,
      controlReplyModal: false,
    };
  }

  render() {
    return (
      <React.StrictMode>
        <div className="tweet-container">
          <div className="thumbnail-wrapper">
            <img className="thumbnail" src="" alt="サム" />
          </div>
          <div className="tweet-wrapper">
            <textarea
              className="tweet-textarea"
              name="tweet"
              id="tweet"
              ref={this.textareaRef}
              onInput={this.onInputTextarea.bind(this)}
              onFocus={this.onFocusTextarea.bind(this)}
              placeholder="いまどうしてる？"
              rows={1}
              value={this.state.body}
            ></textarea>

            {this.props.isNotReply && this.state.focusFlag && this.renderTag()}
            {this.renderTweetMenu()}
          </div>
        </div>
        {!this.props.isModal && <div className="for-b-bottom"></div>}
      </React.StrictMode>
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

  async onClickTweet(): Promise<void> {
    let body = this.state.body;
    const initialNotEmptyPosition = this.state.body.search(/\S/);
    if (initialNotEmptyPosition > 0) {
      body = body.substr(initialNotEmptyPosition);
    }
    if (body) {
      const data: CreateBoardInterface = {
        body: body,
        user: this.props.login_user._id,
        timestamp: Date.now(),
      };
      this.setState({ focusFlag: false });
      await this.postBoard(data);
    } else {
      alert('投稿内容を入力してください');
    }
  }

  async postBoard(board: CreateBoardInterface) {
    const textArea: HTMLTextAreaElement = this.textareaRef.current;
    const grandParentContainer: HTMLDivElement = textArea.parentElement
      .parentElement as HTMLDivElement;
    textArea.style.color = 'gray';
    grandParentContainer.style.backgroundColor = 'rgba(200, 200, 200, 0.1)';
    await this.props.createBoard(board);
    textArea.style.color = 'black';
    grandParentContainer.style.background = 'none';
    this.setState({ body: '' });
  }
}

const mapStateToProps = (state: any) => {
  const login_user = state.login_user;
  console.log('Tweet component state', state);
  return { login_user };
};

const mapDispatchToProps = { createBoard };

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
