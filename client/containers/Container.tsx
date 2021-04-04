import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../views/Home';
import BoardDetail from '../views/BoardDetail';
import Sidebar from '../components/Sidebar';

import { getBoardsForHome } from '../actions';

interface Props {
  sample: any;
}

class Container extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <div className="main-container d-flex">
        <Sidebar user={this.props.login_user} />
        {/* <Route exact path="/compose/tweet" component={Modal}/> */}
        <div className="content-container">
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/:uid/status/:bid" component={BoardDetail}></Route>
          <Route path="/*">
            <Redirect to="/home" />
          </Route>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => {
  console.log('llogin_user', state.login_user);
  return { login_user: state.login_user };
};

const mapDispatchToProps = { getBoardsForHome };

export default connect(mapStateToProps, mapDispatchToProps)(Container);
