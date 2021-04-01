import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { BoardModel } from '../types/BoardModel';
import { login } from '../actions';
import { CreateBoardInterface } from '../../types/boards.interface';

interface LoginState {
  _id: string;
  password: string;
}

class Login extends React.Component<any, LoginState> {
  loginBtnRef: React.RefObject<HTMLAnchorElement>;

  constructor(props: any) {
    super(props);
    this.loginBtnRef = React.createRef();
    this.state = {
      _id: '',
      password: '',
    };
  }

  render(): JSX.Element {
    return (
      <div className="login-container">
        <i className="fab fa-twitter main-icon"></i>
        <div className="login-header">Twitterにログイン</div>
        <div className="login-field-container">
          <span className="login-field-description">
            IDを入力
          </span>
          <input
            id="_id"
            onBlur={this.onBlurField.bind(this)}
            onFocus={this.onFocusField.bind(this)}
            onInput={this.onInputUserField.bind(this)}
            className="login-field"
            type="text"
          />
        </div>
        <div className="login-field-container">
          <span className="login-field-description">パスワード</span>
          <input
            id="password"
            onBlur={this.onBlurField.bind(this)}
            onFocus={this.onFocusField.bind(this)}
            onInput={this.onInputPasswordField.bind(this)}
            className="login-field"
            type="text"
          />
        </div>
        <a
          onClick={this.onClickLoginBtn.bind(this)}
          ref={this.loginBtnRef}
          className="login-btn disabled"
        >
          ログイン
        </a>
        <div className="help-menu-container">
          <a className="forget-pass">パスワードをお忘れですか？</a>
          <a className="new-account">アカウント作成</a>
        </div>
      </div>
    );
  }

  controlLoginBtn(data: LoginState) {
    const loginBtn = this.loginBtnRef.current;
    const { _id, password } = data;
    if (_id && password) {
      loginBtn.className = 'login-btn';
    } else {
      loginBtn.className = 'login-btn disabled';
    }
  }

  onInputUserField(e: React.KeyboardEvent<HTMLInputElement>): void {
    const _id: string = e.currentTarget.value;
    this.setState({ _id });
    const { password } = this.state;
    this.controlLoginBtn({ _id, password });
  }

  onInputPasswordField(e: React.KeyboardEvent<HTMLInputElement>): void {
    const password: string = e.currentTarget.value;
    this.setState({ password });
    const { _id } = this.state;
    this.controlLoginBtn({ _id, password });
  }

  onFocusField(e: React.MouseEvent<HTMLInputElement>): void {
    const inputField: HTMLInputElement = e.target as HTMLInputElement;
    this.styleChangeOnForcus(inputField);
  }

  styleChangeOnForcus(field: HTMLInputElement): void {
    const parentContainer: HTMLDivElement = field.parentNode as HTMLDivElement;
    const brotherSpanElement: HTMLSpanElement = field.previousElementSibling as HTMLSpanElement;
    brotherSpanElement.style.fontSize = '13px';
    brotherSpanElement.style.top = '2%';
    brotherSpanElement.style.color = '#007bff';
    field.style.opacity = '1';
    field.style.height = '30px';
    parentContainer.style.border = '1px solid #007bff';
  }

  onBlurField(e: React.MouseEvent<HTMLInputElement>): void {
    const inputField: HTMLInputElement = e.target as HTMLInputElement;
    const id = inputField.id;
    this.styleChangeOnBlur(inputField, id);
  }

  styleChangeOnBlur(field: HTMLInputElement, id: string): void {
    const parentContainer: HTMLDivElement = field.parentNode as HTMLDivElement;
    const brotherSpanElement: HTMLSpanElement = field.previousElementSibling as HTMLSpanElement;
    field.style.opacity = '1';
    brotherSpanElement.style.color = 'black';
    parentContainer.style.border = '1px solid gray';
    const flag = id === '_id' ? '_id' : 'password';
    if (!this.state[flag]) {
      brotherSpanElement.style.fontSize = '20px';
      brotherSpanElement.style.top = '20%';
      field.style.opacity = '0.5';
      field.style.height = '100%';
    }
  }

  onClickLoginBtn(e: React.MouseEvent<HTMLAnchorElement>): void {
    const { _id, password } = this.state;
    console.log('ログイン処理を行う');
    if (_id && password) {
      console.log('ログイン！')
      this.props.login(this.state)
    }
  }
}

const mapDispatchToProps = { login };

export default connect(null, mapDispatchToProps)(Login);
