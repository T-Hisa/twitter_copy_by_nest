import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { BoardModel } from '../types/BoardModel';
import { UserModel } from '../types/UserModel';
import { displayDate, displayTooltip } from '../utils';

interface BoardProps {
  board: BoardModel;
  login_user: any;
}

const Board: React.FC<BoardProps> = (props) => {
  const { board, login_user } = props;
  // const [todos, setTodos] = useState<Todo[]>([]);

  const renderCount = (count: number): JSX.Element => {
    return <span className="count-display">{count}</span>;
  };

  const renderCountWithDone = (count: number): JSX.Element => {
    return <span className="count-display done">{count}</span>;
  };

  const renderInfo = (word: string): JSX.Element => (
    <div className="board-info">
      <i className="fas fa-retweet"></i>
      <span className="text">{word}さんがリツイートしました</span>
    </div>
  );

  const mouseOverEvent = (e: React.MouseEvent<HTMLDivElement>): void => {
    const forMouseOverEl: HTMLDivElement = e.target as HTMLDivElement;
    const prevEl: HTMLLIElement = forMouseOverEl.previousElementSibling as HTMLLIElement;
    const previousElFirstChild: HTMLDivElement = prevEl.firstChild as HTMLDivElement;
    const className: string = previousElFirstChild.className;
    switch (true) {
      case className.indexOf('common') > -1:
        previousElFirstChild.style.color = 'blue';
        previousElFirstChild.style.backgroundColor = 'rgba(51, 153, 255, 0.2)';
        break;
        case className.indexOf('repost') > -1:
        previousElFirstChild.style.color = 'green';
        previousElFirstChild.style.backgroundColor = 'rgba(1, 255, 0, 0.2)';
        break;
        case className.indexOf('like') > -1:
        previousElFirstChild.style.color = 'red';
        previousElFirstChild.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
      default:
    }
  };

  const mouseLeaveEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const forMouseReaveEl: HTMLDivElement = e.target as HTMLDivElement;
    const prevEl: HTMLLIElement = forMouseReaveEl.previousElementSibling as HTMLLIElement;
    const previousElFirstChild: HTMLDivElement = prevEl.firstChild as HTMLDivElement;
    previousElFirstChild.style.background = 'none';
    previousElFirstChild.style.color = 'black';
  };

  const onClickReply = () => {
    console.log('click reply!!');
  };

  const onClickRepost = () => {
    console.log('click repost!!!');
  };

  const onClickLike = () => {
    console.log('click like!!!');
  };

  const onClickBoard = (board: BoardModel) => {
    console.log('body', board.body);
  };

  const renderCommon = (
    board: BoardModel,
    isQuote: boolean,
    user: UserModel,
    repost_id: string,
  ): JSX.Element => {
    return (
      <React.StrictMode>
        {user && renderInfo(user.username)}
        <div
          onClick={() => {
            onClickBoard(board);
          }}
          className="board-wrapper"
        >
          <div className="board-thumbnail-wrapper">
            <img className="board-thumbnail" src="" alt="サムネイル" />
          </div>
          <div className="board-content-wrapper">
            <div className="board-header">
              <div className="user-info-wrapper">
                <span className="username">{board.user.username}</span>
                <span className="c-gray userid">@{board.user._id}</span>
                <span className="dot">・</span>
                <span className="c-gray">{displayDate(board.timestamp)}</span>
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
            <div className="board-content">
              <div className="body" id={`body-${board._id}`} />
              {board.image && <img src="board.image" alt="投稿した画像" />}
            </div>
            {isQuote && renderQuote(board.origin_board)}
            {renderMenu(board, repost_id)}
          </div>
        </div>
      </React.StrictMode>
    );
  };

  const renderQuote = (board: BoardModel) => {
    return (
      <div className="quote-wrapper">
        <div className="quote-content-wrapper">
          <div className="quote-user-info-wrapper">
            <img className="quote-thumbail" src="" alt="画像" />
            <span className="username">{board.user.username}</span>
            <span className="c-gray userid">@{board.user._id}</span>
            <span className="dot">・</span>
            <span className="c-gray">{displayDate(board.timestamp)}</span>
          </div>
          <div className="quote-content">
            {board.body}
            {board.image && <img src="" alt="投稿した画像" />}
          </div>
        </div>
      </div>
    );
  };

  const renderMenu = (board: BoardModel, repost_id: string) => {
    return (
      <ul className="board-menu">
        <li className="board-menu-wrapper">
          <div className="icon-wrapper common">
            <i className="far fa-comment icon"></i>
          </div>
          <div className="display-number-wrapper">
            {board.reply_count > 0 && renderCount(board.reply_count)}
          </div>
        </li>
        <div
          onMouseOver={mouseOverEvent}
          onMouseLeave={mouseLeaveEvent}
          onClick={onClickReply}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={displayTooltip('reply')}
          className="for-mouse-over common"
        />
        <li className="board-menu-wrapper">
          {board.repost_count > 0 &&
          login_user.repost_boards.indexOf(repost_id) > -1 ? (
            <React.StrictMode>
              <div className="icon-wrapper repost">
                <i className="fas fa-retweet icon done"></i>
              </div>
              {renderCountWithDone(board.repost_count)}
            </React.StrictMode>
          ) : (
            <React.StrictMode>
              <div className="icon-wrapper repost">
                <i className="fas fa-retweet icon"></i>
              </div>
              {renderCount(board.repost_count)}
            </React.StrictMode>
          )}
        </li>
        <div
          onMouseOver={mouseOverEvent}
          onMouseLeave={mouseLeaveEvent}
          onClick={onClickRepost}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={displayTooltip('repost')}
          className="for-mouse-over repost"
        />
        <li className="board-menu-wrapper">
          {board.like_count > 0 &&
          login_user.like_boards.indexOf(board._id) > -1 ? (
            <React.StrictMode>
              <div className="icon-wrapper like">
                <i className="fas fa-heart done icon"></i>
              </div>
              {renderCountWithDone(board.like_count)}
            </React.StrictMode>
          ) : (
            <React.StrictMode>
              <div className="icon-wrapper like">
                <i className="far fa-heart icon"></i>
              </div>
              {renderCount(board.like_count)}
            </React.StrictMode>
          )}
        </li>
        <div
          onMouseOver={mouseOverEvent}
          onMouseLeave={mouseLeaveEvent}
          onClick={onClickLike}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={displayTooltip('like')}
          className="for-mouse-over like"
        />
        <li className="board-menu-wrapper">
          <div
            className="icon-wrapper common"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('share')}
          >
            <i className="fas fa-share icon common"></i>
          </div>
        </li>
        <li
          className="board-menu-wrapper"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={displayTooltip('analytics')}
        >
          <div className="icon-wrapper common">
            <i className="fas fa-chart-bar icon common"></i>
          </div>
        </li>
      </ul>
    );
  };

  // 投稿した直後に描画すると、 body の部分だけ反映されないので、setTimeout を用いて遅れて描画させる
  setTimeout(() => {
    if (board.body) {
      let text = board.body.replace(/\n/g, '<br/>');
      // board.body = board.body.replace(/\n/g, '<br/>');
      const bodyEl: HTMLDivElement = document.getElementById(
        `body-${board._id}`,
      ) as HTMLDivElement;
      if (board.body.match(/\n/)) {
        console.log('debug1');
        console.log('bodyEl', bodyEl);
      }
      if (bodyEl) {
        if (board.body.match(/\n/)) {
          console.log('debug!!!');
        }
        bodyEl.innerHTML = text;
      }
    }
  }, 100);

  return (
    <div className="board-container" key={board._id}>
      {!board.origin_board
        ? renderCommon(board, false, null, null)
        : board.body
        ? renderCommon(board, true, null, null)
        : renderCommon(board.origin_board, false, board.user, board._id)}
    </div>
  );
};

export default Board;