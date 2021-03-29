import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../views/Home';
import Sidebar from '../components/Sidebar';

import { getBoards, getBoardsForHome } from '../actions';

interface Props {
  sample: any;
}

class Container extends React.Component<any, any> {
  componentDidMount() {
    this.props.getBoards()
  }

  sample() {
    console.log('props', this.props)
    this.props.getBoardsForHome()
  }

  render(): JSX.Element {
    return (
      <div className="d-flex">
        <Sidebar />
        <Home />
        <div onClick={this.sample.bind(this)}>
          samplesample
          samplesample
          samplesample
          samplesample
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => {
  return state
}

const mapDispatchToProps = {getBoards, getBoardsForHome}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
