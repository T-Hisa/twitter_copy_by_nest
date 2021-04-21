import * as React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  displayTooltip,
  handleElementEnable,
  handleElementUnable,
  renderInfo,
} from '../utils';

import { BoardModel, UserModel, RouteProps, LikeBoardData } from '../../types';

import { clickLike } from '../actions';

import DisplayBoard from './DisplayBoard';

interface BoardProps extends RouteProps {
  board: BoardModel;
  login_user: UserModel;
  handleClickReply?: any;
  isReply: boolean;
  clickLike: (
    data: LikeBoardData,
    isReply: boolean,
  ) => Promise<BoardModel> | Promise<any>;
  handleRedraw: () => void;
}

const Board: React.FC<BoardProps> = (props) => {
  let { board, login_user } = props;

  const renderCount = (count: number): JSX.Element => {
    return <span className="count-display">{count}</span>;
  };

  const renderCountWithDone = (count: number): JSX.Element => {
    return <span className="count-display done">{count}</span>;
  };

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

  const onClickReply = (e: React.MouseEvent<HTMLElement>) => {
    const replyEl: HTMLDivElement = e.target as HTMLDivElement;
    const prevEl: HTMLLIElement = replyEl.previousElementSibling as HTMLLIElement;
    const previousElFirstChild: HTMLDivElement = prevEl.firstChild as HTMLDivElement;
    previousElFirstChild.style.background = 'none';
    previousElFirstChild.style.color = 'black';
    props.handleClickReply(board);
  };

  const getDivPosition = (
    e: React.MouseEvent<HTMLElement>,
  ): [number, number] => {
    const x = pageXOffset;
    const y = pageYOffset;
    const positionParentEl = document.elementFromPoint(
      e.pageX - x,
      e.pageY - y,
    );
    const xPosition = positionParentEl.getBoundingClientRect().left;
    const yPosition = positionParentEl.getBoundingClientRect().top;
    return [x + xPosition, y + yPosition];
  };

  const handleResend = () => {
    console.log('resend!');
  };

  const handleQuote = () => {
    console.log('quote!');
  };

  const genPopupEl = (x: number, y: number): HTMLDivElement => {
    const popupContainer = document.createElement('div');
    popupContainer.className = 'popup-container';
    popupContainer.addEventListener('click', (event) => {
      popupContainer.remove();
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
    return popupContainer;
  };

  const handlePopup = (x: number, y: number) => {
    const rootEl = document.getElementById('root');
    // const parentEl = document.getElementsByClassName('home-container')[0];
    const popupEl = genPopupEl(x, y);
    rootEl.appendChild(popupEl);
  };

  const onClickRepost = (e: React.MouseEvent<HTMLElement>) => {
    const [x, y] = getDivPosition(e);
    handlePopup(x, y);
  };

  const onClickLike = async (el: HTMLElement) => {
    const bid: string = board._id;
    const uid: string = login_user._id;
    const origin_bid: string | null =
      !board.body && board.origin_board ? board.origin_board._id : null;
    const targetBoard: BoardModel = !!origin_bid ? board.origin_board : board;
    if (!targetBoard.like_users) {
      targetBoard.like_users = [];
    }
    // const isAlreadyLike = login_user.like_board_ids.includes(bid);
    const isAlreadyLike = targetBoard.like_users?.includes(uid);
    const sendData: LikeBoardData = {
      bid,
      uid,
      isAlreadyLike,
      origin_bid,
      // isReply: props.isReply
    };
    handleElementUnable(el);
    const data: BoardModel = await props.clickLike(sendData, props.isReply);
    if (props.isReply) {
      board = data;
    }
    props.handleRedraw();
    handleElementEnable(el);
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
        onClickReply(e);
        return;
      case 'for-mouse-over repost':
        onClickRepost(e);
        return;
      case 'for-mouse-over like':
      case 'for-mouse-over like disabled':
        onClickLike(target);
        return;
      case 'fas fa-share icon common':
      case 'icon-wrapper commonshare':
      // onClickShare()
      case 'fas fa-chart-bar icon common':
      case 'fas fa-ellipsis-h icon analyze':
      // onClickAnalyze()
      case 'icon-wrapper  more-btn':
      // onClickMore()
      case 'match':
        return;
      default:
        props.history.push(`/${board.user._id}/status/${board._id}`);
    }
  };

  const renderCommon = (
    displayBoard: BoardModel,
    isQuote: boolean,
    repost_user: UserModel,
  ): JSX.Element => {
    return (
      <React.StrictMode>
        {repost_user &&
          renderInfo(repost_user.username, login_user.username, true)}
        <div onClick={onClickBoard} className="board-wrapper">
          {/* <div className="board-wrapper"> */}
          <div className="thumbnail-wrapper">
            <img className="thumbnail" src="" alt="サム" />
          </div>
          <div className="board-content-wrapper">
            <DisplayBoard
              board={displayBoard}
              isQuote={isQuote}
              // isReply={false}
              // isModal={false}
            />
            {renderMenu(displayBoard)}
          </div>
        </div>
      </React.StrictMode>
    );
  };

  const renderMenu = (displayBoard: BoardModel) => {
    const isAlreadyLike: boolean = displayBoard?.like_users?.includes(
      login_user._id,
    );
    const isAlreadyRepost: boolean = displayBoard?.repost_users?.includes(
      login_user._id,
    );

    return (
      <ul className="board-menu">
        <li className="board-menu-wrapper">
          <div className="icon-wrapper common">
            <i className="far fa-comment icon"></i>
          </div>
          <div className="display-number-wrapper">
            {displayBoard.reply_count > 0 &&
              renderCount(displayBoard.reply_count)}
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
        <li className="board-menu-wrapper repost-wrapper">
          {/* {login_user.repost_boards.indexOf(repost_users) > -1 ? ( */}
          {isAlreadyRepost ? (
            <React.StrictMode>
              <div className="icon-wrapper repost">
                <i className="fas fa-retweet icon done"></i>
              </div>
              {renderCountWithDone(displayBoard.repost_count)}
            </React.StrictMode>
          ) : (
            <React.StrictMode>
              <div className="icon-wrapper repost">
                <i className="fas fa-retweet icon"></i>
              </div>
              {displayBoard.repost_count > 0 &&
                renderCount(displayBoard.repost_count)}
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
        <li className="board-menu-wrapper like-wrapper">
          {/* {login_user.like_board_ids?.indexOf(board._id) > -1 ? ( */}
          {isAlreadyLike ? (
            <React.StrictMode>
              <div className="icon-wrapper like">
                <i className="fas fa-heart done icon"></i>
              </div>
              {renderCountWithDone(displayBoard.like_count)}
            </React.StrictMode>
          ) : (
            <React.StrictMode>
              <div className="icon-wrapper like">
                <i className="far fa-heart icon"></i>
              </div>
              {displayBoard.like_count > 0 &&
                renderCount(displayBoard.like_count)}
            </React.StrictMode>
          )}
        </li>
        <div
          onMouseOver={mouseOverEvent}
          onMouseLeave={mouseLeaveEvent}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={
            isAlreadyLike ? displayTooltip('like-done') : displayTooltip('like')
          }
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
        ? // 標準ツイート
          renderCommon(board, false, null)
        : !!board.body
        ? // 引用ツイート
          renderCommon(board, true, null)
        : // リツイート
          renderCommon(board.origin_board, false, board.user)}
    </div>
  );
};

const mapDispatchToProps = { clickLike };

export default withRouter(connect(null, mapDispatchToProps)(Board));
