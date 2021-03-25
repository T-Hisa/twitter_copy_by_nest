import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface Props {
  sample: any
}

class Container extends React.Component<{}, {}> {

  render(): JSX.Element {
    return (
      <div className="d-flex">
      </div>
    )
  }
}

export default Container