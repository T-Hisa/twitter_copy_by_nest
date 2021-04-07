import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../views/Home';
import BoardDetail from '../views/BoardDetail';

import Sidebar from '../components/Sidebar';

import { getBoardsForHome } from '../actions';
import { UserModel } from '../../types';

interface ContainerProps {
  login_user: UserModel;
}

interface ContainerState {
  redrawFlag: number;
}

class Container extends React.Component<ContainerProps, ContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      redrawFlag: 0,
    };
  }
  render(): JSX.Element {
    return (
      <div className="main-container d-flex">
        <div className="content-container">
          <Route
            exact
            path="/home"
            render={(routeProps: RouteProps) => (
              <Home
              {...routeProps}
              handleRedraw={this.handleRedrawFlag.bind(this)}
              />
              )}
          />
          <Route exact path="/:uid/status/:bid" component={BoardDetail} />
          <Route path="/*">
            <Redirect to="/home" />
          </Route>
        </div>
        {/* poupさせる要素をの前面に出したいので最後に記述 */}
        <Sidebar
          login_user={this.props.login_user}
          handleRedraw={this.handleRedrawFlag.bind(this)}
        />
      </div>
    );
  }

  handleRedrawFlag() {
    const redrawFlag = this.state.redrawFlag + 1;
    this.setState({ redrawFlag });
  }
}

const mapStateToProps = (state: any): any => {
  return { login_user: state.login_user };
};

const mapDispatchToProps = { getBoardsForHome };

export default connect(mapStateToProps, mapDispatchToProps)(Container);
