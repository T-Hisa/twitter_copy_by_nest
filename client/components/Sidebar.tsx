import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props {
  sample: any;
}

class Sidebar extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div className="sidebar">
        <ul className="d-flex menu-list">
          <li className="icon-wrapper">
            <i className="fab fa-twitter icon main-icon"></i>
          </li>
          <li className="icon-wrapper">
            <i className="fas fa-home icon"></i>
            <div className="menu-detail">ホーム</div>
          </li>
          <li className="icon-wrapper">
            {/* <i className="fas fa-hashtag"></i> */}
            <i className="fab fa-sistrix icon"></i>
            <div className="menu-detail">話題を検索</div>
          </li>
          <li className="icon-wrapper">
            <i className="far fa-bell icon"></i>
            <div className="menu-detail">通知</div>
          </li>
          <li className="icon-wrapper">
            <i className="far fa-envelope icon"></i>
            <div className="menu-detail">メッセージ</div>
          </li>
          <li className="icon-wrapper">
            <i className="far fa-bookmark icon"></i>
            <div className="menu-detail">ブックマーク</div>
          </li>
          <li className="icon-wrapper">
            <i className="far fa-list-alt icon"></i>
            <div className="menu-detail">リスト</div>
          </li>
          <li className="icon-wrapper">
            <i className="far fa-user icon"></i>
            <div className="menu-detail">プロフィール</div>
          </li>
          <li className="icon-wrapper">
            <i className="fas fa-ellipsis-h icon"></i>
            <div className="menu-detail">もっと見る</div>
          </li>
          <li  className="tweet">
            <i className="fas fa-pencil-ruler tweet-btn icon"></i>
            <div className="do-tweet">ツイートする</div>
          </li>
          {/* <li>
            <i className="fas fa-check-circle icon"></i>
          </li> */}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
