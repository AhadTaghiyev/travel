import axios from "axios";

import { userService } from "./systemUserServer";

const Axios = axios.create({
  baseURL: "http://darxaz-001-site5.itempurl.com/api/v1",
  // baseURL: 'https://localhost:7154/api/v1',
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const access_token = await userService.refreshToken();

      if (!access_token) {
        userService.logout();
        return Promise.reject(error);
      }

      Axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      return Axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default Axios;
