import axios from "axios";
import { token, API_USER, API_LOGOUT, API_LOGIN } from "../assets/urls";
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
export const logout = async () => {
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