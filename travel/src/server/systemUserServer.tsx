import Axios from './Axios';

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
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
          }
        )
      ).data;
    } catch (error) {
      console.log('err: ', error);
    }
  },
  get: async function Get(): Promise<any> {
    try {
      return await (
        await Axios.get(`/User/GetCurrentUser`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        })
      ).data;
    } catch (error) {
      console.log('err: ', error);
    }
  },
  logout:  function Logout():void {
    localStorage.removeItem("username")
    localStorage.removeItem('role')
    localStorage.removeItem('token')
  },
};
