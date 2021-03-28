import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { BoardModel } from '../types/BoardModel';
import { createBoard } from '../actions';
import { CreateBoardInterface } from '../../types/boards.interface';

class Home extends React.Component<any, any> {
  textareaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: any) {
    super(props);
    this.textareaRef = React.createRef();
  }

  onClickTweet(e: React.MouseEvent<HTMLAnchorElement>): void {
    const data: CreateBoardInterface = {
      body: 'sample',
      user: 'sample-id',
      date: new Date().getTime()
    }
    console.log('clicked!!!!!!!')
    this.props.createBoard(data)
  }


  render(): JSX.Element {
    return (
      <div className="login-container">
        <i className="fab fa-twitter main-icon"></i>
        <div className="login-header">
          Twitterにログイン
        </div>
        <div className="login-field-container">
          <span className="login-field-description">電話、メールまたはユーザー名</span>
          <input className="login-field" type="text"/>
        </div>
        <div className="login-field-container">
          <span className="login-field-description">パスワード</span>
          <input className="login-field" type="text"/>
        </div>
        <a className="login-btn">
          ログイン
        </a>
        <div className="help-menu-container">
          <a className="forget-pass">
            パスワードをお忘れですか？
          </a>
          <a className="new-account">
            アカウント作成
          </a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { createBoard };

export default connect(null, mapDispatchToProps)(Home);
