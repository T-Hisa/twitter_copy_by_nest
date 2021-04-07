import * as React from 'react';

import { connect } from 'react-redux';

import { displayTooltip, renderTag } from '../utils';

import { createBoard } from '../actions';
import { BoardModel, UserModel, CreateBoardInterface } from '../../types';

interface SendTweetProps {
  isNotReply: boolean;
  createBoard: any;
  login_user: UserModel;
  isModal: boolean;

  repost_bid?: string
  reply_board?: BoardModel
  handleRedraw: () => void;
}

interface SendTweetState {
  body: string;
  focusFlag: boolean;
  controlReplyModal: boolean;
}

class SendTweet extends React.Component<SendTweetProps, SendTweetState> {
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
              placeholder={this.displayPleceholder()}
              rows={1}
              value={this.state.body}
            ></textarea>

            {((this.props.isModal && this.props.isNotReply) || this.state.focusFlag) && renderTag()}
            {this.renderTweetMenu()}
          </div>
        </div>
        {!this.props.isModal && <div className="for-b-bottom"></div>}
      </React.StrictMode>
    );
  }
  ;

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
    // Tweet した際に初めに空白文字分があったら、その分だけ削除する処理
    const initialNotEmptyIndex = this.state.body.search(/\S/);
    if (initialNotEmptyIndex > 0) {
      body = body.substr(initialNotEmptyIndex);
    }

    if (body) {
      let data: CreateBoardInterface
      if (this.props.isNotReply) {
        data = {
          body,
          user: this.props.login_user._id,
          timestamp: Date.now(),
        };
      } else {
        console.log('reply_board, ', this.props.reply_board)
        const uids: string[] = this.props.reply_board.reply_user_ids || []
        uids.push(this.props.reply_board.user._id)
        const reply_to: string = this.props.reply_board._id
        data = {
          body,
          user: this.props.login_user._id,
          timestamp: Date.now(),
          reply_to,
          reply_to_userids: uids
        }
      }
      this.setState({ focusFlag: false });
      await this.postBoard(data);
      this.props.handleRedraw();
    } else {
      alert('投稿内容を入力してください');
    }
  }

  async postBoard(board: CreateBoardInterface) {
    if (this.props.repost_bid) board["repost_bid"] = this.props.repost_bid
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

  displayPleceholder() {
    const placeholder = (this.props.isModal && !this.props.isNotReply)
      ? '返信をツイート'
      : 'いまどうしてる？'
    return placeholder
  }
}

const mapStateToProps = (state: any) => {
  const login_user = state.login_user;
  return { login_user };
};

const mapDispatchToProps = { createBoard };

export default connect(mapStateToProps, mapDispatchToProps)(SendTweet);
