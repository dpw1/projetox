import React from "react";
import axios from "axios";
import {
  token,
  API_USER,
  API_LOGOUT,
  API_LOGIN,
  API_PRODUCTS,
  API_VARIATIONS,
} from "../assets/urls";
import { setCookie, eraseCookie } from "./helpers";

const LOCALSTORAGE_USER = "userdata";

/**
 * GET: Get user data if user is logged in.
 * In case user is logged out, simply returns null.
 */
export const getUserData = async () => {
  let user = localStorage.getItem(LOCALSTORAGE_USER);

  if (user && token) {
    return JSON.parse(user);
  }

  user = await axios.get(API_USER, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  user && localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(user));

  return user ? user : false;
};

/**
 * POST: Login request to API.
 */
export const login = async data => {
  axios
    .post(API_LOGIN, data)
    .then(res => {
      const token = res.data;
      setCookie("token", JSON.stringify(token));
      window.location.reload();
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
    });
};

/**
 * POST: Logout request to API.
 */
export const logout = async props => {
  // debugger;
  try {
    await axios.post(API_LOGOUT, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const cleanData = () => {
      eraseCookie("token");
      localStorage.removeItem(LOCALSTORAGE_USER);
      window.location.reload();
    };

    setTimeout(() => cleanData(), 50);
  } catch (err) {
    console.log(err);
  }
};

/**
 * GET: Search for a variation.
 * The fields to search for are set on the backend.
 * Currently (December 2019) it's possible to search only for EAN codes.
 */

export const searchVariation = async (value = "") => {
  if (value === "") return [];

  const url = `${API_VARIATIONS}?search=${value}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * POST: Create a new product.
 */

export const createProduct = async (data = "") => {
  try {
    const product = await axios.post(API_PRODUCTS, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return product;
  } catch (err) {
    return err;
  }
};
