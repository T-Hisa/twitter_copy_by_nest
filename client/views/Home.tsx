import * as React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBoard } from '../actions';
import { getBoardsForHome } from '../actions';

import BoardComponent from '../components/Board';
import Modal from '../components/Modal';

import { BoardModel } from '../types/BoardModel';
import { CreateBoardInterface } from '../../types/boards.interface';
import { RouteProps } from '../types/RouteProps';

import { displayTooltip } from '../utils';

interface HomeProps extends RouteProps {
  boards?: BoardModel[];
  createBoard: any;
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
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  tweetBtnRef: React.RefObject<HTMLAnchorElement>;
  modalRef: React.RefObject<any>;

  constructor(props: HomeProps) {
    super(props);
    this.textareaRef = React.createRef();
    this.tweetBtnRef = React.createRef();
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
          {this.renderTweet()}

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
            placeholder="いまどうしてる？"
            rows={1}
            value={this.state.body}
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

  handleClickReply(board: BoardModel) {
    console.log('replyClicked!!!');
    console.log('this.modalRef', this.modalRef);
    console.log('this.modalRef.current', this.modalRef.current);
    this.setState({ selectedBoard: board });
    // this.modalRef.current.props.board = board
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

const mapDispatchToProps = { createBoard, getBoardsForHome };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
