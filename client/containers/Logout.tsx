import * as React from 'react';

import { connect } from 'react-redux';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { UserModel } from '../../types';

import { logout } from '../actions';

interface LogoutProps extends RouteComponentProps {
  login_user: UserModel;
  logout: () => {};
}

interface LogoutState {
  isOpen: boolean;
}

class Logout extends React.Component<LogoutProps, LogoutState> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <div
        onClick={this.handleClick.bind(this)}
        className="logout-view-container"
      >
        <div className="logout-wrapper">
          <div className="logout-icon-wrapper">
            <i className="fab fa-twitter icon main-icon"></i>
          </div>
          <div className="logout-confirm">
            @{this.props.login_user._id}からログアウトしますか？
          </div>
          <div className="logout-description">
            このアカウントにのみ適用されます。他のアカウントはログインしたままです。
          </div>
          <div className="btn-wrapper">
            <a onClick={this.cancelLogout.bind(this)} className="button cancel-btn">
              <span className="word">キャンセル</span>
            </a>
            <a
              onClick={this.onClickLogout.bind(this)}
              className="button logout-btn"
            >
              <span className="word">ログアウト</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  cancelLogout() {
    this.props.history.go(-1);
  }

  handleClick(e: React.MouseEvent<HTMLElement>) {
    const clickTarget: HTMLElement = e.target as HTMLElement;
    if (clickTarget.className === 'logout-view-container') {
      this.cancelLogout()
    }
  }

  onClickLogout() {
    this.props.logout();
  }
}

const mapStateToProps = (state: any) => ({ login_user: state.login_user });
const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
