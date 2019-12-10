import { getCookie } from "../utils/helpers";

export const URLS = {
  dashboard: "/",
  newProductEan: "/produtos/ean",
  newProduct: "/produtos/novo",
  signUp: "/signup",
  login: "/login",
  myProducts: "/meus-produtos",
};

export const API = "http://127.0.0.1:8000/api/v1";
export const API_LOGIN = `${API}/rest-auth/login/`;
export const API_LOGOUT = `${API}/rest-auth/logout/`;
export const API_POSTS = `${API}/posts/`;
export const API_USER = `${API}/rest-auth/user/`;
export const API_PRODUCTS = `${API}/products/`;
export const API_VARIATIONS = `${API}/variations/`;
export const token = getCookie("token")
  ? Object.values(JSON.parse(getCookie("token")))[0]
  : null;
