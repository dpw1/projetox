import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Dashboard from "./dashboard/Dashboard";
import LoginPage from "./login/LoginPage";
import SignUpPage from "./signup/SignUpPage";
import NewEANPage from "./product/NewEANPage";
import NewProductPage from "./product/NewProductPage";
import MyProductsPage from "./product/MyProductsPage";
import * as serviceWorker from "./serviceWorker";
import { getUserData } from "./utils/api";
import { URLS } from "./assets/urls";
import { PrivateRoute } from "./utils/helpers";
import { token } from "./assets/urls";

const render = (
  <div className="main">
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* <header>
        <Link to="/">First one</Link>
        <Link to="/posts">Dashboard</Link>
      </header> */}
      <Switch>
        <Route
          exact
          path={URLS.login}
          render={() =>
            token ? <Redirect to={URLS.dashboard} /> : <LoginPage />
          }
        />
        <Route exact path={URLS.signUp} render={() => <SignUpPage />} />
        <PrivateRoute exact path={URLS.dashboard} component={Dashboard} />
        <PrivateRoute exact path={URLS.newProductEan} component={NewEANPage} />
        <PrivateRoute exact path={URLS.newProduct} component={NewProductPage} />
        <PrivateRoute exact path={URLS.myProducts} component={MyProductsPage} />
      </Switch>
    </BrowserRouter>
  </div>
);

ReactDOM.render(render, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
