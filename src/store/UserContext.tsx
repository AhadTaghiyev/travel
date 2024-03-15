import { createContext, useEffect, useState } from "react";
import { userService } from "../server/systemUserServer";

export const UserContext = createContext<{
  user?: any;
  loading?: boolean;
  getUser?: () => Promise<void>;
}>({});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getUser();
  }, [window]);

  const getUser = async () => {
    setLoading(true);
    const res = await userService.get();
    if (res) setUser(res);
    else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
    setLoading(false);
  };

  const values = {
    user,
    loading,
    getUser,
    setUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
