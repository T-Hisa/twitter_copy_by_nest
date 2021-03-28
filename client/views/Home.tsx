import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { BoardModel } from '../types/BoardModel';
import { createBoard } from '../actions';
import { CreateBoardInterface } from '../../types/boards.interface';

interface HomeProps {
  boards?: BoardModel[];
}

class Home extends React.Component<any, any> {
  textareaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: any) {
    super(props);
    this.textareaRef = React.createRef();
  }

  onInputTextarea(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    const body: string = e.currentTarget.value;
    const textarea: HTMLTextAreaElement = this.textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    this.setState({ body });
  }

  onClickSample(e: any) {
    e.preventDefault()
  }


  onClickTweet(e: React.MouseEvent<HTMLAnchorElement>): void {
    const data: CreateBoardInterface = {
      body: 'sample',
      user: 'sample-id',
      date: new Date().getTime()
    }
    console.log('clicked!!!!!!!')
    this.props.createBoard(data)
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
            <a onClick={this.onClickTweet.bind(this)} className="send-tweet-btn bg-primary">ツイートする</a>
          </div>
        </div>
      </div>
    );
  }

  renderBoard(board: BoardModel): JSX.Element {
    return <React.StrictMode>{board.body}</React.StrictMode>;
  }

  render(): JSX.Element {
    return (
      <div className="home-container">
        {this.renderHeader()}
        {this.renderTweet()}
        <div className="empty-zone" />
        {this.props.boards &&
          this.props.boards.map((board) => this.renderBoard(board))}
      </div>
    );
  }
}

const mapDispatchToProps = { createBoard };

export default connect(null, mapDispatchToProps)(Home);
