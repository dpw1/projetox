import { getCookie } from "../utils/helpers";

export const URLS = {
  dashboard: "/",
  newProductEan: "/products/ean",
  newProduct: "/products/new",
  signUp: "/signup",
  login: "/login",
};

export const API = "http://127.0.0.1:8000/api/v1";
export const API_LOGIN = `${API}/rest-auth/login/`;
export const API_LOGOUT = `${API}/rest-auth/logout/`;
export const API_POSTS = `${API}/posts/`;
export const API_USER = `${API}/rest-auth/user/`;
export const token = getCookie("token")
  ? Object.values(JSON.parse(getCookie("token")))[0]
  : null;
