import axios from "axios";
import { API_USER, token, API_LOGIN } from "./backend";
import { setCookie } from "./frontend";

/**
 * GET: Get user data if user is logged in.
 * In case user is logged out, simply returns null.
 */
export const getUserData = async () => {
  const user = await axios.get(API_USER, {
    headers: {
      Authorization: `Token ${token}`
    }
  });

  return user ? user : null;
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
      console.log(res);
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
    });
};
