import { createContext, useEffect, useState } from "react";
import { userService } from "../server/systemUserServer";

export const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getUser();
  }, [window]);

  const getUser = async () => {
    const res = await userService.get();
    if (res) setUser(res);
    else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  };

  const values = {
    user,
    getUser,
    setUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
