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
  get: async function Get(): Promise<any> {
    try {
      return await (
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
  },
  refreshToken: async function () {
    try {
      const resp = await Axios.post(
        `/Auth/RefreshTokenLoginAsync?refreshToken=${cookies.get(
          "refresh_token"
        )}`,
        {}
      );
      return resp.data;
    } catch (e) {
      console.log("Error", e);
    }
  },
};
