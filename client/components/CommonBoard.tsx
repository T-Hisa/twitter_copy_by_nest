import * as React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { displayDate, displayTooltip } from '../utils';
import { BoardModel } from '../types/BoardModel';

interface CommonBoardProps {
  board: BoardModel;
  isQuote: boolean;
  isReply: boolean;
  isModal: boolean;
}

const CommonBoard: React.FC<CommonBoardProps> = (props) => {
  const { board } = props;

  // 投稿した直後に描画すると、 body の部分だけ反映されないので、setTimeout を用いてほんの少し遅れて描画させる
  const renderBoardBody = () => {
    let text = board.body.replace(/\n/g, '<br/>');
    let bodyEl: HTMLDivElement
    if (props.isModal) {
      bodyEl = document.getElementById(
        `body-modal-${board?._id}`,
      ) as HTMLDivElement;
      if (bodyEl) {
        bodyEl.innerHTML = text;
      }
    } else {
      bodyEl = document.getElementById(
        `body-${board._id}`,
      ) as HTMLDivElement;
      if (bodyEl) {
        bodyEl.innerHTML = text;
      }
    }
  }

  setTimeout(() => {
    renderBoardBody();
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
            <img className="quote-thumbnail" src="" alt="画像" />
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

  const reply_userids = board?.reply_user_ids
    ? board.reply_user_ids.concat(board.user._id)
    : board.user._id;

  return (
    <React.StrictMode>
      {props.isReply && renderThumbnail()}
      <div className="board-content-wrapper">
        <div className="board-header">
          <div className="user-info-wrapper">
            <span className="username">{board?.user.username}</span>
            <span className="c-gray userid">@{board?.user._id}</span>
            <span className="dot">・</span>
            <span className="c-gray">{displayDate(board?.timestamp)}</span>
          </div>
          {!props.isModal && (
            <div
              className="icon-wrapper  more-btn"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title={displayTooltip('more')}
            >
              <i className="fas fa-ellipsis-h icon"></i>
            </div>
          )}
        </div>
        <div className="board-content">
          {props.isModal ? (
            <div className="body-modal" id={`body-modal-${board?._id}`} />
          ) : (
            <div id={`body-${board?._id}`} />
          )}
          {board?.image && <img src="board.image" alt="投稿した画像" />}
          {props.isReply && (
            <div className="reply-to-wrapper">
              返信先:
              <span className="reply-userid">@{reply_userids}</span>
              さん
            </div>
          )}
        </div>
        {props.isQuote && renderQuote()}
      </div>
    </React.StrictMode>
  );
};

export default CommonBoard;
