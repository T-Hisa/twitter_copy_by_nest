import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import Container from './containers/Container';
import Login from './containers/Login';
import Logout from './containers/Logout';

import { reload } from './actions';
import { UserModel } from '../types';

interface AppProps {
  login_user: UserModel;
  reload: () => {};
}

class App extends React.Component<AppProps, any> {
  componentDidMount(): void {
    this.props.reload();
  }

  renderRegular() {
    return(
    <React.StrictMode>
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <Route path="/" component={Container}/>
      </Switch>
    </React.StrictMode>
    )
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
        {this.props.login_user ? this.renderRegular() : this.renderLogin()}
      </React.StrictMode>
    );
  }
}

const mapStateToProps = (state: any) => {
  return { login_user: state.login_user };
};

const mapDispatchToProps = { reload };

export default connect(mapStateToProps, mapDispatchToProps)(App);
