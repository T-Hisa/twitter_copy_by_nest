import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props {
  sample: any;
}

class Sidebar extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div className="sidebar">
        <ul className="d-flex menu-list">
          <li>
            <i className="fab fa-twitter icon main-icon"></i>
          </li>
          <li>
            <i className="fas fa-home icon"></i>
          </li>
          <li>
            {/* <i className="fas fa-hashtag"></i> */}
            <i className="fab fa-sistrix icon"></i>
          </li>
          <li>
            <i className="far fa-bell icon"></i>
          </li>
          <li>
            <i className="far fa-envelope icon"></i>
          </li>
          <li>
            <i className="far fa-bookmark icon"></i>
          </li>
          <li>
            <i className="far fa-list-alt icon"></i>
          </li>
          <li>
            <i className="far fa-user icon"></i>
          </li>
          <li>
            <i className="fas fa-ellipsis-h icon"></i>
          </li>
          <li  className="tweet">
            <i className="fas fa-pencil-ruler tweet-btn icon"></i>
          </li>
          <li>
            <i className="fas fa-check-circle icon"></i>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
