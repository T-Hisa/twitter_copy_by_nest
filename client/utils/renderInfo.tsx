export const renderInfo = (username: string, login_username: string | null, isNotDetail: boolean): JSX.Element => {
  if (isNotDetail) {
    return (
      <div className="board-info">
        <i className="fas fa-retweet"></i>
        {username === login_username ? (
          <span className="text">リツイート済み</span>
        ) : (
          <span className="text">{username}さんがリツイートしました</span>
        )}
      </div>
    )
  }
}
