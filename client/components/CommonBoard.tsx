import * as React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { displayDate, displayTooltip } from '../utils';
import { BoardModel } from '../types/BoardModel';

interface CommonBoardProps {
  board: BoardModel
  isQuote: boolean
}

const CommonBoard: React.FC<CommonBoardProps> = (props) => {
  const { board } = props;


  const renderQuote = (board: BoardModel) => {
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
      {props.isQuote && renderQuote(board.origin_board)}
    </React.StrictMode>
  );
};

export default CommonBoard;
