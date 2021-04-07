import * as React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { displayDate, renderBoardBody } from '../utils';
import { BoardModel } from '../../types';

interface ModalBoardProps {
  board: BoardModel;
  isQuote: boolean;
  isReply: boolean;
}

const ModalBoard: React.FC<ModalBoardProps> = (props) => {
  const { board } = props;

  // 投稿した直後に描画すると、 body の部分だけ反映されないので、setTimeout を用いてほんの少し遅れて描画させる
  setTimeout(() => {
    renderBoardBody(board.body, board._id, true);
  }, 1);

  const renderThumbnail = () => {
    return (
      <div className="thumbnail-wrapper">
        <img className="thumbnail" src="" alt="サム" />
        <div className="reply-line" />
      </div>
    );
  };

  const renderQuote = () => {
    return (
      <div className="quote-wrapper">
        <div className="quote-content-wrapper">
          <div className="quote-user-info-wrapper">
            <img className="quote-thumbnail" src="" alt="サム" />
            <span className="quote-username">{board?.user?.username}</span>
            <span className="c-gray quote-userid">@{board?.user?._id}</span>
            <span className="quote-dot">・</span>
            <span className="c-gray quote-time">
              {displayDate(board?.timestamp)}
            </span>
          </div>
          <div className="quote-content">
            {board?.body}
            {board?.image && <img src="" alt="投稿した画像" />}
          </div>
        </div>
      </div>
    );
  };

  const displayReplyUserIds = () => {
    const reply_to_users: string[] = board?.reply_to_users.concat()
    reply_to_users.unshift(board?.user?._id)
    let displayWord: string = ''
    for (let index in reply_to_users) {
      if (index === '1') {
        displayWord += `, ${reply_to_users[index]}`
      } else if (index === '2') {
        displayWord += `他${reply_to_users.length - 2}名`
        break
      }
      displayWord += `${reply_to_users[index]}`
    }
    return displayWord
  }


  return (
    <React.StrictMode>
      {props.isReply && renderThumbnail()}
      <div className="board-content-wrapper">
        <div className="board-header">
          <div className="user-info-wrapper">
            <span className="username">{board?.user?.username}</span>
            <span className="c-gray userid">@{board?.user?._id}</span>
            <span className="dot">・</span>
            <span className="c-gray">{displayDate(board?.timestamp)}</span>
          </div>
        </div>
        <div className="board-content">
          <div className="body-modal" id={`body-modal-${board?._id}`} />
          {board?.image && <img src="board.image" alt="投稿した画像" />}
        </div>
        {props.isQuote && renderQuote()}
        {props.isReply && (
          <div className="reply-to-wrapper">
            返信先:
            <span className="reply-userid">@{displayReplyUserIds()}</span>
            さんÏ
          </div>
        )}
      </div>
    </React.StrictMode>
  );
};

export default ModalBoard;
