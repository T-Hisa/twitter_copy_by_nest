import * as React from 'react';
import { Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import TweetModal from './TweetModal';
import { UserModel } from '../../types';

interface SidebarProps extends RouteComponentProps {
  login_user: UserModel;
  handleRedraw: () => {};
}

interface SidebarState {
  controlReplyModal: boolean;
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      controlReplyModal: false,
    };
  }

  render(): JSX.Element {
    return (
      <React.StrictMode>
        <div className="sidebar" id="sidebar">
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
          </ul>
          <div onClick={this.onClickAccount.bind(this)}>
            <div className="account-info-container" id="account-info">
              <div className="account-info-wrapper">
                <img className="thumbnail" src="" alt="サム" />
                <div className="account-info">
                  <div className="username">{this.props.login_user.username}</div>
                  <div className="c-gray">@{this.props.login_user._id}</div>
                </div>
              </div>
              <div className="icon-wrapper">
                <i className="fas fa-ellipsis-h icon"></i>
              </div>
            </div>
          </div>
        </div>
        <TweetModal
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

  onClickAccount() {
    this.handleAccountPopup();
  }

  handleAccountPopup() {
    const parentEl = document.getElementById('sidebar');
    const accountPopupContainer = document.createElement('div');
    accountPopupContainer.className = 'popup-container';
    accountPopupContainer.id = 'account-popup';
    accountPopupContainer.addEventListener('click', (event) => {
      accountPopupContainer.remove();
    });
    const popupEl = document.createElement('div');
    popupEl.className = 'account-popup-wrapper';
    // const origin_node = document.getElementById('account-info')
    // const firstChildEl = origin_node.cloneNode(true)
    // const icon_wrapper =firstChildEl.

    const firstChildEl = document.createElement('div');
    firstChildEl.className = 'popup-account-info-container';
    const grandChildEl = document.createElement('div');
    grandChildEl.className = 'popup-account-info-wrapper';
    const thumbnailEl = document.createElement('img');
    thumbnailEl.alt = 'サム';
    const accountInfoEl = document.createElement('div');
    accountInfoEl.className = 'popup-account-info';
    const usernameEl = document.createElement('div');
    usernameEl.className = 'username';
    usernameEl.innerText = `${this.props.login_user.username}`;
    const useridEl = document.createElement('div');
    useridEl.className = 'c-gray';
    useridEl.innerText = `${this.props.login_user._id}`;

    accountInfoEl.appendChild(usernameEl);
    accountInfoEl.appendChild(useridEl);
    grandChildEl.appendChild(thumbnailEl);
    grandChildEl.appendChild(accountInfoEl);
    firstChildEl.appendChild(grandChildEl);

    const addAccountEl = document.createElement('div');
    addAccountEl.className = 'popup-account-info-container';
    addAccountEl.innerText = '既存のアカウントを追加';

    const controlAccountEl = document.createElement('div');
    controlAccountEl.className = 'popup-account-info-container';
    controlAccountEl.innerText = 'アカウントを管理';

    const logoutEl = document.createElement('div');
    logoutEl.className = 'popup-account-info-container';
    logoutEl.innerText = `@${this.props.login_user._id}からログアウト`;

    logoutEl.addEventListener('click', () => {
      this.props.history.push('logout')
    });

    popupEl.appendChild(firstChildEl);
    popupEl.appendChild(addAccountEl);
    popupEl.appendChild(controlAccountEl);
    popupEl.appendChild(logoutEl);
    accountPopupContainer.appendChild(popupEl);
    parentEl.appendChild(accountPopupContainer);
  }
}

// export default withRouter(connect(null, mapDispatchToProps)(Sidebar));
// export default connect(null, mapDispatchToProps)(Sidebar);
export default withRouter(Sidebar);
