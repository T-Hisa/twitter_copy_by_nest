import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Home from '../views/Home'
import Sidebar from '../components/Sidebar'


interface Props {
  sample: any
}

class Container extends React.Component<{}, {}> {

  render(): JSX.Element {
    return (
      <div className="d-flex">
        <Sidebar/>
        <Home/>
      </div>
    )
  }
}

export default Container