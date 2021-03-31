import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { BoardModel } from '../../types/BoardModel';
import { UserModel } from '../../types/UserModel';

interface BoardProps {
  board: BoardModel;
  login_user: any;
}

const Board: React.FC<BoardProps> = (props) => {
  const { board, login_user } = props;
  // console.log(login_user.repost_boards.indexOf(board._id), board.body)

  const displayDate = (timestamp: number): string => {
    const now = Date.now();
    const subtraction = now - timestamp;
    switch (true) {
      case subtraction < 1000:
        return '現在';
      case subtraction < 60000:
        const sec = Math.floor(subtraction / 1000);
        return `${sec}秒前`;
      case subtraction < 3600000:
        const minutes = Math.floor(subtraction / 60000);
        return `${minutes}分`;
      case subtraction < 86400000:
        const hour = Math.floor(subtraction / 3600000);
        return `${hour}時間`;
      case subtraction < 172800000:
        return '昨日';
      case subtraction < 259200000:
        return '2日前';
      default:
        const nowDate = new Date(now);
        const date = new Date(timestamp);
        const nowYear = `${nowDate.getFullYear()}`;
        const boardYear = `${date.getFullYear()}`;
        const boardMonth = `${date.getMonth() + 1}`;
        const boardDay = `${date.getDate()}`;
        const commonWord = `${boardMonth}月${boardDay}日`;
        const displayWord =
          nowYear === boardYear ? `${boardYear}年${commonWord}` : commonWord;
        return displayWord;
    }
  };

  const renderCount = (count: number): JSX.Element => {
    // console.log('flag', flag)
    return <span className="count-display">{count}</span>;
  };

  const renderCountWithDone = (count: number): JSX.Element => {
    console.log('renderCountWithDone!!!!');
    return <span className="count-display done">{count}</span>;
  };

  const renderInfo = (word: string): JSX.Element => (
    <div className="board-info">
      <i className="fas fa-retweet"></i>
      <span className="text">{word}さんがリツイートしました</span>
    </div>
  );

  const sample = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e)
    console.log(e.target)
    const icon_container = e.target as HTMLLIElement;
    console.log('icon_container', icon_container)
    const first_child = icon_container.firstChild
    console.log('first_child', first_child)
  }

  const renderCommon = (
    board: BoardModel,
    isQuote: boolean,
    user: UserModel,
    repost_id: string
  ): JSX.Element => {
    return (
      <React.StrictMode>
        {user && renderInfo(user.username)}
        <div className="board-wrapper">
          <div className="board-thumbnail-wrapper">
            <img className="board-thumbnail" src="" alt="サムネイル" />
          </div>
          <div className="board-content-wrapper">
            <div className="user-info-wrapper">
              <span className="username">{board.user.username}</span>
              <span className="userid">@{board.user._id}</span>
              <span className="dot">・</span>
              <span className="time-display">{displayDate(board.timestamp)}</span>
            </div>
            <div className="board-content">
              {board.body}
              {board.image && <img src="board.image" alt="投稿した画像" />}
            </div>
            {
              isQuote && renderQuote(board.origin_board)
            }
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
            <img className="quote-thumbail" src="" alt="画像"/>
            <span className="username">{board.user.username}</span>
            <span className="c-gray userid">@{board.user._id}</span>
            <span className="dot">・</span>
            <span className="c-gray">{displayDate(board.timestamp)}</span>
          </div>
          <div className="quote-content">
            {board.body}
            {board.image && <img src="" alt="投稿した画像"/>}
          </div>
        </div>
      </div>
    );
  };

    const renderMenu = (board: BoardModel, repost_id: string) => {
    return (
      <ul className="board-menu">
        <li className="board-menu-wrapper common">
          <div onMouseOver={sample} className="icon-wrapper">
            <i className="far fa-comment icon"></i>
          </div>
          <div className="display-number-wrapper">
            {board.reply_count > 0 && renderCount(board.reply_count)}
          </div>
        </li>
        <li className="board-menu-wrapper repost">
          {board.repost_count > 0 &&
          login_user.repost_boards.indexOf(repost_id) > -1 ? (
            <React.StrictMode>
              <div className="icon-wrapper">
                <i className="fas fa-retweet icon done"></i>
              </div>
              {renderCountWithDone(board.repost_count)}
            </React.StrictMode>
          ) : (
            <React.StrictMode>
              <div className="icon-wrapper">
                <i className="fas fa-retweet icon"></i>
              </div>
              {renderCount(board.repost_count)}
            </React.StrictMode>
          )}
        </li>
        <li className="board-menu-wrapper like">
          {board.like_count > 0 &&
          login_user.like_boards.indexOf(board._id) > -1 ? (
            <React.StrictMode>
              <div className="icon-wrapper">
                <i className="fas fa-heart done icon"></i>
              </div>
              {renderCountWithDone(board.like_count)}
            </React.StrictMode>
          ) : (
            <React.StrictMode>
              <div className="icon-wrapper">
                <i className="far fa-heart icon"></i>
              </div>
              {renderCount(board.like_count)}
            </React.StrictMode>
          )}
        </li>
        <li className="board-menu-wrapper common">
          <div className="icon-wrapper">
            <i className="fas fa-share icon"></i>
          </div>
        </li>
        <li className="board-menu-wrapper common">
          <div className="icon-wrapper">
            <i className="fas fa-chart-bar icon"></i>
          </div>
        </li>
      </ul>
    )
  }

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
