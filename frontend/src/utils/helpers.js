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
  setCookie(name, "");
  document.cookie = name + "=; Max-Age=-99999999;";
  // document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
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

/**
 *
 * Private Route for pages that need Login.
 */
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

/**
 * Renames a given property
 */

export function renameProperty(obj, oldName, newName) {
  // Do nothing if the names are the same
  if (oldName === newName) {
    return obj;
  }
  // Check for the old property name to avoid a ReferenceError in strict mode.
  if (obj.hasOwnProperty(oldName)) {
    obj[newName] = obj[oldName];
    delete obj[oldName];
  }
  return obj;
}

/**
 *
 * @param {int} amount - quantity in cents to be formatted to money.
 * @param {string} currency - currency wanted.
 */

export function formatMoney(amount, currency = "brl") {
  const catchErrors = (() => {
    if (amount === null) throw new Error("Please add an amount.");
    if (amount < 0)
      throw new Error("Please only use only positive Integer values.");
  })();

  parseInt((amount /= 100));

  if (currency.toLowerCase() === "brl") {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  }
}

/**
 *
 * @param {int} ms - miliseconds to wait for. Works only inside async functions.
 */

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sorts the order of an array of objects.
 * For instance, given the following array: [{name: 'abc', id: 1}]
 * you could change its order to [{id: 1, name: 'abc'}]
 *
 * @param {array} arr - array of objects.
 * @param {object} sortOrder - order you want for the new array of objects.
 */

export function sortObjectsOrder(arr, sortOrder) {
  return arr.map(o =>
    Object.assign(
      {},
      ...Object.keys(o)
        .sort((a, b) => sortOrder[a] - sortOrder[b])
        .map(x => {
          return { [x]: o[x] };
        }),
    ),
  );
}
