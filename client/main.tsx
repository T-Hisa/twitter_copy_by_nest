import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// import reducer from "./reducers"
import "./scss/main.scss"

import Container from "./containers/Container"

const enhancer = applyMiddleware(thunk)
// const store = createStore({reducer}, enhancer)


console.log('sampleaasswsssa')
ReactDOM.render(
  // <Provider store={store}>
  <Router>
    <Container />
  </Router>,
  // </Provider>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
