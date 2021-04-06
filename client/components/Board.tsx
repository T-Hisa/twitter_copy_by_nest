import * as React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { displayTooltip } from '../utils';

import { BoardModel } from '../types/BoardModel';
import { UserModel } from '../types/UserModel';
import { RouteProps } from '../types/RouteProps';

import CommonBoard from './CommonBoard';
import EventEmitter from 'node:events';

interface BoardProps extends RouteProps {
  board: BoardModel;
  login_user: any;
  handleClickReply: any;
}

const Board: React.FC<BoardProps> = (props) => {
  const { board, login_user } = props;
  // const [todos, setTodos] = React.useState<Todo[]>([]);

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

  const onClickReply = (e: React.MouseEvent<HTMLDivElement>) => {
    const replyEl: HTMLDivElement = e.target as HTMLDivElement;
    const prevEl: HTMLLIElement = replyEl.previousElementSibling as HTMLLIElement;
    const previousElFirstChild: HTMLDivElement = prevEl.firstChild as HTMLDivElement;
    previousElFirstChild.style.background = 'none';
    previousElFirstChild.style.color = 'black';
    props.handleClickReply(board);
  };

  const getDivPosition = (
    e: React.MouseEvent<HTMLDivElement>,
  ): [number, number] => {
    const x = pageXOffset;
    const y = pageYOffset;
    const positionParentEl = document.elementFromPoint(
      e.pageX - x,
      e.pageY - y,
    );
    const xPosition = positionParentEl.getBoundingClientRect().left;
    const yPosition = positionParentEl.getBoundingClientRect().top;
    return [xPosition, yPosition];
  };

  const handleResend = () => {
    console.log('resend!');
  };

  const handleQuote = () => {
    console.log('quote!');
  };

  const handlePopup = (x: number, y: number) => {
    const rootEl = document.getElementById('root');
    const popupContainer = document.createElement('div');
    popupContainer.className = 'popup-container';
    popupContainer.id = 'popup';
    popupContainer.addEventListener('click', (event) => {
      const popupContainerEl = document.getElementById('popup');
      popupContainerEl.remove();
      switch ((event.target as HTMLElement).id) {
        case 'resend':
          handleResend();
          break;
        case 'quote':
          handleQuote();
          break;
        default:
      }
    });
    const popupEl = document.createElement('div');
    popupEl.className = 'popup-wrapper';
    popupEl.style.left = `${x}px`;
    popupEl.style.top = `${y}px`;

    const firstChildEl = document.createElement('span');
    firstChildEl.className = 'popup-element';
    firstChildEl.id = 'resend';
    firstChildEl.innerHTML = '<i class="fas fa-retweet"></i>　再投稿';
    const secondChildEl = document.createElement('span');
    secondChildEl.className = 'popup-element';
    secondChildEl.id = 'quote';
    secondChildEl.innerHTML = '<i class="fas fa-pen"></i>　引用投稿';
    popupEl.appendChild(firstChildEl);
    popupEl.appendChild(secondChildEl);
    popupContainer.appendChild(popupEl);
    setTimeout(() => {
      rootEl.appendChild(popupContainer);
    }, 1);
  };

  const onClickRepost = (e: React.MouseEvent<HTMLDivElement>) => {
    const [x, y] = getDivPosition(e);
    handlePopup(x, y);
  };

  const onClickLike = () => {
    console.log('click like!!!');
  };

  const onClickBoard = (e: React.MouseEvent<HTMLElement>) => {
    const target: HTMLElement = e.target as HTMLElement;
    const className = target.classList.value;
    switch (className) {
      case 'thumbnail':
        // onClickThumbnail()
        return;
      case 'quote-wrapper':
      case 'quote-user-info-wrapper':
      case 'quote-thumbnail':
      case 'quote-username':
      case 'quote-content':
      case 'c-gray quote-userid':
      case 'c-gray quote-dot':
      case 'c-gray quote-time':
        return;
      // this.onClickQuote()
      case 'for-mouse-over common':
        onClickReply(e as React.MouseEvent<HTMLDivElement>);
        return;
      case 'for-mouse-over repost':
        onClickRepost(e as React.MouseEvent<HTMLDivElement>);
        return;
      case 'for-mouse-over like':
        onClickLike();
        return;
      case 'fas fa-share icon common':
      case 'icon-wrapper commonshare':
      // onClickShare()
      case 'fas fa-chart-bar icon common':
      case 'fas fa-ellipsis-h icon analyze':
      // onClickAnalyze()
      case 'icon-wrapper  more-btn':
        // onClickMore()
        return;
      default:
        props.history.push(`/${board.user._id}/status/${board._id}`);
    }
  };

  const renderCommon = (
    displayBoard: BoardModel,
    isQuote: boolean,
    repost_user: UserModel,
    repost_user_id: string,
  ): JSX.Element => {
    return (
      <React.StrictMode>
        {repost_user && renderInfo(repost_user.username)}
        <div onClick={onClickBoard} className="board-wrapper">
          {/* <div className="board-wrapper"> */}
          <div className="thumbnail-wrapper">
            <img className="thumbnail" src="" alt="サム" />
          </div>
          <div className="board-content-wrapper">
            <CommonBoard
              board={displayBoard}
              isQuote={isQuote}
              isReply={false}
              isModal={false}
            />
            {renderMenu(displayBoard, repost_user_id)}
          </div>
        </div>
      </React.StrictMode>
    );
  };

  const renderMenu = (board: BoardModel, repost_user_id: string) => {
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
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={displayTooltip('reply')}
          className="for-mouse-over common"
        />
        <li className="board-menu-wrapper">
          {login_user.repost_boards.indexOf(repost_user_id) > -1 ? (
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
              {board.repost_count > 0 && renderCount(board.repost_count)}
            </React.StrictMode>
          )}
        </li>
        <div
          onMouseOver={mouseOverEvent}
          onMouseLeave={mouseLeaveEvent}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={displayTooltip('repost')}
          className="for-mouse-over repost"
        />
        <li className="board-menu-wrapper">
          {login_user.like_boards.indexOf(board._id) > -1 ? (
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
              {board.like_count > 0 && renderCount(board.like_count)}
            </React.StrictMode>
          )}
        </li>
        <div
          onMouseOver={mouseOverEvent}
          onMouseLeave={mouseLeaveEvent}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={displayTooltip('like')}
          className="for-mouse-over like"
        />
        <li className="board-menu-wrapper">
          <div
            className="icon-wrapper common share"
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
          <div className="icon-wrapper common analyze">
            <i className="fas fa-chart-bar icon common"></i>
          </div>
        </li>
      </ul>
    );
  };

  return (
    <div className="board-container" key={board._id}>
      {!board.origin_board
        ? renderCommon(board, false, null, null)
        : !!board.body
        ? renderCommon(board, true, null, null)
        : renderCommon(board.origin_board, false, board.user, board._id)}
    </div>
  );
};

export default withRouter(Board);
