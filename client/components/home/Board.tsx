import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { BoardModel } from "../../types/BoardModel";

interface BoardProps {
  board: BoardModel
}

const Board: React.FC<BoardProps> = props => {

  const displayDate = (timestamp: number): string => {
    const now = Date.now()
    const subtraction = now - timestamp
    switch (true) {
      case subtraction < 1000:
        return '現在'
      case subtraction < 60000:
        const sec = Math.floor(subtraction / 1000)
        return `${sec}秒前`
      case subtraction < 3600000:
        const minutes = Math.floor(subtraction / 60000)
        return `${minutes}分`
      case subtraction < 86400000:
        const hour = Math.floor(subtraction / 3600000)
        return `${hour}時間`
      case subtraction < 172800000:
        return '昨日'
      case subtraction < 259200000:
        return '2日前'
      default:
        const nowDate = new Date(now)
        const date = new Date(timestamp)
        const nowYear = `${nowDate.getFullYear()}`
        const boardYear = `${date.getFullYear()}`
        const boardMonth = `${date.getMonth() + 1}`
        const boardDay = `${date.getDate()}`
        const commonWord = `${boardMonth}月${boardDay}日`
        const displayWord = nowYear === boardYear
          ? `${boardYear}年${commonWord}`
          : commonWord
        return displayWord
    }
  }

  const board = props.board

  const renderCount = (number: number): JSX.Element => {
    return (
      <span className="count-display">
        {number}
      </span>
    )
  }

  return (
    <div className="board-wrapper" key={board._id}>
        <div className="board-thumbnail-wrapper">
          <img className="board-thumbnail" src="" alt="サムネイル" />
        </div>
        <div className="board-content-wrapper">
          <div className="user-info-wrapper">
            <span className="username">{board.user.username}</span>
            <span className="userid">@{board.user._id}</span>
            <span className="dot">・</span>
            <span className="time-display">
              {displayDate(board.timestamp)}
            </span>
          </div>
          <div className="board-content">
            {board.body}
            {board.iamge && <img src="board.image" alt="投稿した画像" />}
          </div>
          <ul className="board-menu">
            <li className="board-menu-wrapper">
              <i className="far fa-comment"></i>
              {
                board.reply_count > 0 && renderCount(board.reply_count)
              }
            </li>
            <li className="board-menu-wrapper">
              <i className="fas fa-retweet"></i>
              {
                board.repost_count > 0 && renderCount(board.repost_count)
              }
            </li>
            <li className="board-menu-wrapper">
              <i className="far fa-heart"></i>
            </li>
            <li className="board-menu-wrapper">
              <i className="fas fa-share"></i>
            </li>
            <li className="board-menu-wrapper">
              <i className="fas fa-chart-bar"></i>
            </li>
          </ul>
        </div>
      </div>
  )
}

export default Board