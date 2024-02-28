import Cookies from "universal-cookie";

import Axios from "./Axios";

const cookies = new Cookies();

export const userService = {
  login: async function Login(
    username: string,
    password: string
  ): Promise<any> {
    try {
      return await (
        await Axios.post(
          `/Identities/login`,
          {
            username: username,
            password: password,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        )
      ).data;
    } catch (error) {
      console.log("err: ", error);
    }
  },
  register: async function Register(values: {
    name: string;
    email: string;
    phoneNumber: string;
    adress?: string;
    detail?: string;
    subscribeType: string;
  }): Promise<any> {
    try {
      return await (
        await Axios.post(
          `/Company`,
          { values },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        )
      ).data;
    } catch (error) {
      console.log("err: ", error);
    }
  },
  get: async function Get(): Promise<any> {
    try {
      return (
        await Axios.get(`/Identities/GetCurrentUser`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            accept: "application/json",
          },
        })
      ).data;
    } catch (error) {
      console.log("err: ", error);
    }
  },
  logout: function Logout(): void {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    cookies.remove("refresh_token");
  },
  refreshToken: async function () {
    try {
      const resp = await Axios.post(
        `/Auth/RefreshTokenLoginAsync?refreshToken=${encodeURIComponent(
          cookies.get("refresh_token")
        )}`,
        {}
      );
      const { accessToken, refreshToken } = resp.data;

      if (!accessToken || !refreshToken) {
        return null;
      }

      cookies.set("refresh_token", refreshToken, { path: "/" });
      localStorage.setItem("token", accessToken);
      return accessToken;
    } catch (e) {
      console.log("Error", e);
      return null;
    }
  },
};
