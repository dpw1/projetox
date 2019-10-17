import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dashboard from "./dashboard/Dashboard";
import LoginPage from "./login/LoginPage";
import SignUpPage from "./signup/SignUpPage";

import NewEANPage from "./product/NewEANPage";
import * as serviceWorker from "./serviceWorker";
import { getUserData } from "./utils/api";
import { URLS } from "./assets/urls";

const render = (
  <div className="main">
    <BrowserRouter>
      {/* <header>
        <Link to="/">First one</Link>
        <Link to="/posts">Dashboard</Link>
      </header> */}

      <Switch>
        <Route
          exact
          path="/"
          component={!!getUserData ? Dashboard : LoginPage}
        />
        <Route exact path={URLS.dashboard} component={Dashboard} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path={URLS.newProduct} component={NewEANPage} />
      </Switch>
    </BrowserRouter>
  </div>
);

ReactDOM.render(render, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
