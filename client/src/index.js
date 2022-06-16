import ReactDOM from "react-dom/client";
import "./Styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Global/Redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
