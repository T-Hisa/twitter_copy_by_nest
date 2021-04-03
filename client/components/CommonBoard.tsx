import * as React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { displayDate, displayTooltip } from '../utils';
import { BoardModel } from '../types/BoardModel';

interface CommonBoardProps {
  board: BoardModel
  isQuote: boolean
  isReply: boolean
}

const CommonBoard: React.FC<CommonBoardProps> = (props) => {
  const { board } = props;

  console.log('isReply', props.isReply)
  const renderThumbnail = () => {
    return (
      <div className="reply-thumbnail">
        <img className="thumbnail" src="" alt="サム"/>
        <div className="reply-line"></div>
      </div>
    )
  }

  const renderQuote = () => {
    return (
      <div className="quote-wrapper">
        <div className="quote-content-wrapper">
          <div className="quote-user-info-wrapper">
            <img className="quote-thumbail" src="" alt="画像" />
            <span className="username">{board?.user?.username}</span>
            <span className="c-gray userid">@{board?.user?._id}</span>
            <span className="dot">・</span>
            <span className="c-gray">{displayDate(board?.timestamp)}</span>
          </div>
          <div className="quote-content">
            {board?.body}
            {board?.image && <img src="" alt="投稿した画像" />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <React.StrictMode>
      {
        props.isReply && renderThumbnail()
      }
      <div className="board-content-wrapper">
        <div className="board-header">
          <div className="user-info-wrapper">
            <span className="username">{board?.user.username}</span>
            <span className="c-gray userid">@{board?.user._id}</span>
            <span className="dot">・</span>
            <span className="c-gray">{displayDate(board?.timestamp)}</span>
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
          <div className="body" id={`body-${board?._id}`} />
          {board?.image && <img src="board.image" alt="投稿した画像" />}
        </div>
        {props.isQuote && renderQuote()}
      </div>
    </React.StrictMode>
  );
};

export default CommonBoard;
