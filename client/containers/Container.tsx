import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../views/Home';
import Sidebar from '../components/Sidebar';

import { getBoardsForHome } from '../actions';

interface Props {
  sample: any;
}

class Container extends React.Component<any, any> {
  // componentDidMount() {
  //   this.props.getBoardsForHome()
  // }

  render(): JSX.Element {
    return (
      <div className="d-flex">
        <Sidebar />
        <Route exact path="/" component={Home}></Route>
        <Route path="/*" >
          <Redirect to="/"/>
        </Route>
        <div onClick={this.sample.bind(this)}>
        </div>
      </div>
    );
  }

  sample() {
    console.log('props', this.props)
    // console.log('state', this.state)
  }
}

const mapStateToProps = (state: any): any => {
  return state
}

const mapDispatchToProps = {getBoardsForHome}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
