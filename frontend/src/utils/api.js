import React from "react";
import axios from "axios";
import {
  token,
  API_USER,
  API_LOGOUT,
  API_LOGIN,
  API_VARIATIONS,
} from "../assets/urls";
import { setCookie, eraseCookie } from "./helpers";

/**
 * GET: Get user data if user is logged in.
 * In case user is logged out, simply returns null.
 */
export const getUserData = async () => {
  const user = await axios.get(API_USER, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

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
  axios
    .post(API_LOGOUT)
    .then(res => {
      eraseCookie("token");
      window.location.reload();
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
    });
};

/**
 * POST: Search a variation.
 * The fields to search for are set on the backend.
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
    return err;
  }
};
