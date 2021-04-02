import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from './containers/Container';
import Login from './containers/Login';

import { reload } from './actions';

class App extends React.Component<any, any> {
  componentDidMount(): void {
    this.props.reload()
  }

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
        {this.props.login_user
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

const mapDispatchToProps = { reload };

export default connect(mapStateToProps, mapDispatchToProps)(App);
