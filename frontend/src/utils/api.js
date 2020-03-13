import React from "react";
import axios from "axios";
import {
  token,
  API_USER,
  API_LOGOUT,
  API_LOGIN,
  API_PRODUCTS,
  API_VARIATIONS,
  API_USER_PRODUCTS,
  API_MELI,
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

/**
 * POST: Add a new product to the currently logged in user's account.
 */

export const createUserProduct = async (data = "") => {
  try {
    const userProduct = await axios.post(API_USER_PRODUCTS, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return userProduct;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * GET: Search for a variation.
 * The fields to search for are set on the backend.
 * Currently (December 2019) it's possible to search only for EAN codes.
 */

export const getUserProducts = async () => {
  try {
    const { data } = await axios.get(API_USER_PRODUCTS, {
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
 * GET: Search for a product by a variation's EAN.
 * The fields to search for are set on the backend @ search_fields on products.views.
 */

export const getProductByEAN = async ean => {
  const url = `${API_PRODUCTS}?search=${ean}`;

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
 * GET: Get all information about current user logged in Mercado Livre.
 */

export const getMeliData = async () => {
  try {
    const { data } = await axios.get(API_MELI, {
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
 * GET: Get product categories. (public)
 */

export const getMeliProductCategories = async (id = "") => {
  const url =
    id === ""
      ? "https://api.mercadolibre.com/sites/MLB/categories"
      : `https://api.mercadolibre.com/categories/${id}`;

  try {
    console.log(url);
    const { data } = await axios.get(url, {
      headers: {
        access_token: `APP_USR-3798470433211711-031221-00d101667768f32c039f22efef3b3c25-535628279`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
