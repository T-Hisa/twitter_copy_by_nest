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
              {board.iamge && <img src="board.image" alt="投稿した画像" />}
            </div>
            {renderMenu(board, repost_id)}
          </div>
        </div>
      </React.StrictMode>
    );
  };

  const renderQuote = (board: BoardModel) => {
    return (
      <React.StrictMode>
        {board.body}
      </React.StrictMode>
    );
  };

    const renderMenu = (board: BoardModel, repost_id: string) => {
    return (
      <ul className="board-menu">
        <li className="board-menu-wrapper">
          <i className="far fa-comment"></i>
          {board.reply_count > 0 && renderCount(board.reply_count)}
        </li>
        <li className="board-menu-wrapper repost">
          {board.repost_count > 0 &&
          login_user.repost_boards.indexOf(repost_id) > -1 ? (
            <React.StrictMode>
              <i className="fas fa-retweet done"></i>
              {renderCountWithDone(board.repost_count)}
            </React.StrictMode>
          ) : (
            <React.StrictMode>
              <i className="fas fa-retweet"></i>
              {renderCount(board.repost_count)}
            </React.StrictMode>
          )}
        </li>
        <li className="board-menu-wrapper like">
          {board.like_count > 0 &&
          login_user.like_boards.indexOf(board._id) > -1 ? (
            <React.StrictMode>
              <i className="fas fa-heart done"></i>
              {renderCountWithDone(board.like_count)}
            </React.StrictMode>
          ) : (
            <React.StrictMode>
              <i className="far fa-heart"></i>
              {renderCount(board.like_count)}
            </React.StrictMode>
          )}
        </li>
        <li className="board-menu-wrapper">
          <i className="fas fa-share"></i>
        </li>
        <li className="board-menu-wrapper">
          <i className="fas fa-chart-bar"></i>
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
