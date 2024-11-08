import axios from "axios";
import Axios from "./Axios";
import { BASE_URL } from "@/constants";

export const apiService = {
  get: async function Get(api: string): Promise<any> {
    try {
      const res = await Axios.get(api);
      if (res.status === 401)
        window.location.pathname = `${BASE_URL}/auth/login`;
      else return res;
    } catch (error: any) {
      return error.response;
    }
  },

  post: async function Post(api: string, object: any, customHeaders: any = {}): Promise<any> {
    try {
      const res = await Axios.post(api, object, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          accept: "application/json",
          ...customHeaders,
        },
      });
      if (res.status === 401)
        window.location.pathname = `${BASE_URL}/auth/login`;
      else return res;
    } catch (error: any) {
      return error.response;
    }
  },

  postForm: async function Post(api: string, object: any): Promise<any> {
    try {
      const res = await Axios.post(api, object, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 401)
        window.location.pathname = `${BASE_URL}/auth/login`;
      else return res;
    } catch (error: any) {
      return error.response;
    }
  },
  putForm: async function Post(api: string, object: any): Promise<any> {
    try {
      const res = await Axios.put(api, object, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 401)
        window.location.pathname = `${BASE_URL}/auth/login`;
      else return res;
    } catch (error: any) {
      return error.response;
    }
  },

  put: async function Put(api: string, object: any): Promise<any> {
    try {
      const res = await Axios.put(api, object, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      if (res.status === 401)
        window.location.pathname = `${BASE_URL}/auth/login`;
      else return res;
    } catch (error: any) {
      return error.response;
    }
  },

  delete: async function Delete(api: string, id: any): Promise<any> {
    try {
      const res = await Axios.delete(api + "/" + id);
      if (res.status === 401)
        window.location.pathname = `${BASE_URL}/auth/login`;
      else return res;
    } catch (error: any) {
      return error.response;
    }
  },
  patch: async function Patch(
    api: string,
    id: any,
    queryParam = ""
  ): Promise<any> {
    try {
      const res = await Axios.patch(api + "/" + id + queryParam);
      if (res.status === 401)
        window.location.pathname = `${BASE_URL}/auth/login`;
      else return res;
    } catch (error: any) {
      return error.response;
    }
  },
  download: async function Download(api: string, name: string): Promise<any> {
    try {
      const token = localStorage.getItem("token"); // Replace "your_token_key" with the actual key you used to store the token
      if (!token) {
        console.error("Token is not found");
        return;
      }

      const res = await axios.get(api, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      return error.response;
    }
  },
};
