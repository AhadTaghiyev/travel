import axios from "axios";

import { userService } from "./systemUserServer";
import { SERVER_BASE_URL } from "@/constants";

const Axios = axios.create({
  baseURL: SERVER_BASE_URL,
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
        window.location.href = "/auth";
        return Promise.reject(error);
      }

      Axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      return Axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default Axios;
