import React from "react";
import { Redirect, Route } from "react-router-dom";
import { token, URLS } from "../assets/urls";

export function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

/**
 *
 * @param {STR} id
 * @param {OBJ} node
 *
 * example:
 */
export function getNodeById(id, node) {
  var reduce = [].reduce;
  function runner(result, node) {
    if (result || !node) return result;
    return (
      (node.id === id && node) ||
      runner(null, node.children) ||
      reduce.call(Object(node), runner, result)
    );
  }
  return runner(null, node);
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: URLS.login,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
