import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./constants/theme";
import { CssBaseline } from "@material-ui/core";
import List from "./pages/request/list";
import Login from "./pages/login/index";
import { PrivateRoute } from "./router/PrivateRoute";
import history from "./history";
import CreateRequest from "./pages/request/create";
import UpdateRequest from "./pages/request/update";
import DetailRequest from "./pages/request/detail";
import User from "./pages/user/index";
import Category from "./pages/category/index";
import Department from "./pages/department";
import ForgotPassword from "./pages/forgotPassword/index";
import ResetPassword from "./pages/resetPassword/index";
import ChangePassword from "./pages/changePassword/index";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/">
            <List />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/create-request">
            <CreateRequest />
          </PrivateRoute>
          <PrivateRoute path="/updateRequest/:id">
            <UpdateRequest />
          </PrivateRoute>
          <PrivateRoute path="/requestDetail/:id">
            <DetailRequest />
          </PrivateRoute>
          <PrivateRoute path="/user">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/category">
            <Category />
          </PrivateRoute>
          <PrivateRoute path="/department">
            <Department />
          </PrivateRoute>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/update-password">
            <ResetPassword />
          </Route>
          <PrivateRoute path="/change-password">
            <ChangePassword />
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
