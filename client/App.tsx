import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from './containers/Container';
import Login from './containers/Login';

class App extends React.Component<any, any> {
  renderRegular() {
    return <Route path="/" component={Container}></Route>;
  }

  renderLogin() {
    return (
      <React.StrictMode>
        <Route exact path="/login" component={Login} />
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </React.StrictMode>
    );
  }

  render() {
    return (
      <React.StrictMode>
        {this.props.login_user.access_token
          ? this.renderRegular()
          : this.renderLogin()}
      </React.StrictMode>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log('state at app', state);
  return state;
};

export default connect(mapStateToProps)(App);
