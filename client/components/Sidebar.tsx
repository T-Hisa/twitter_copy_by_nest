import * as React from 'react';
import { Route, Redirect, withRouter, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from './Modal';
import { UserModel } from '../types/UserModel';

interface SidebarProps extends RouteProps {
  user?: any;
  handleRedraw: () => {};
}

interface SidebarState {
  controlReplyModal: boolean;
}

class Sidebar extends React.Component<any, SidebarState> {
  constructor(props) {
    super(props);
    this.state = {
      controlReplyModal: false,
    };
  }

  render(): JSX.Element {
    return (
      <React.StrictMode>
        <div className="sidebar">
          <ul className="d-flex menu-list">
            <li className="icon-wrapper">
              <i className="fab fa-twitter icon main-icon"></i>
            </li>
            <li className={this.customClass('home')}>
              <i className="fas fa-home icon"></i>
              <div className="menu-detail">ホーム</div>
            </li>
            <li className={this.customClass('search')}>
              {/* <i className="fas fa-hashtag"></i> */}
              <i className="fab fa-sistrix icon"></i>
              <div className="menu-detail">話題を検索</div>
            </li>
            <li className={this.customClass('notify')}>
              <i className="far fa-bell icon"></i>
              <div className="menu-detail">通知</div>
            </li>
            <li className={this.customClass('message')}>
              <i className="far fa-envelope icon"></i>
              <div className="menu-detail">メッセージ</div>
            </li>
            <li className={this.customClass('bookmarks')}>
              <i className="far fa-bookmark icon"></i>
              <div className="menu-detail">ブックマーク</div>
            </li>
            <li className={this.customClass('未定')}>
              <i className="far fa-list-alt icon"></i>
              <div className="menu-detail">リスト</div>
            </li>
            <li className={this.customClass('profile')}>
              <i className="far fa-user icon"></i>
              <div className="menu-detail">プロフィール</div>
            </li>
            <li className={this.customClass('more')}>
              <i className="fas fa-ellipsis-h icon"></i>
              <div className="menu-detail">もっと見る</div>
            </li>
            <li onClick={this.onClickTweet.bind(this)} className="post">
              <i className="fas fa-pencil-ruler post-btn icon"></i>
              <div className="do-post">ツイートする</div>
            </li>
            {/* <li>
              <i className="fas fa-check-circle icon"></i>
            </li> */}
          </ul>
          <div className="account-info-container">
            <div className="account-info-wrapper">
              <img className="thumbnail" src="" alt="サム" />
              <div className="account-info">
                <div className="username">{this.props.user.username}</div>
                <div className="c-gray">@{this.props.user._id}</div>
              </div>
            </div>
            <div className="icon-wrapper">
              <i className="fas fa-ellipsis-h icon"></i>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.controlReplyModal}
          handleCloseModal={this.handleCloseModal.bind(this)}
          isNotReply={true}
          handleRedraw={this.props.handleRedraw}
        />
      </React.StrictMode>
    );
  }

  handleCloseModal() {
    this.setState({ controlReplyModal: false });
  }

  onClickTweet() {
    this.setState({ controlReplyModal: true });
  }

  customClass(path: string): string {
    const pathName = this.props.location.pathname;
    if (pathName.indexOf(path) > -1) {
      return 'icon-wrapper active';
    } else {
      return 'icon-wrapper';
    }
  }
}

export default withRouter(Sidebar);
