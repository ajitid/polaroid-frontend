import axios from "axios";

import store from "../store/store";
import router from "../router";

export const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(
  config => {
    const { accessToken } = store.state.auth;
    config.headers.Authorization = accessToken ? `Token ${accessToken}` : "";
    return config;
  },
  e => Promise.reject(e)
);

api.interceptors.response.use(
  r => r,
  e => {
    if (e.response && e.response.status === 401) {
      store.commit("setAccessToken", null);
      // FIXME from  login page navigating to this next path
      router.push(`/account/login?next=${window.location.pathname}`);
    }
    return Promise.reject(e);
  }
);

export const apiWithoutAuth = axios.create({
  baseURL: API_URL
});

export default api;
