import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import configStore from "./redux/store";

import Login from "./Test/Login";
import Logout from "./Test/Logout";

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <Login />
    <Logout /> */}
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
