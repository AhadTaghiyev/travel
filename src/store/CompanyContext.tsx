import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { apiService } from "@/server/apiServer";

export const CompanyContext = createContext<{
  company?: {
    name: string;
    email: string;
    phoneNumber: string;
    adress: string;
    detail: string;
    image: string;
    concurency: string;
  };
  loading?: boolean;
  getCompany?: () => Promise<void>;
}>({});

export const CompanyProvider = ({ children }: any) => {
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) getCompany();
  }, [user]);

  useEffect(() => {
    if (company) {
      setLoading(false);
    }
  }, [company]);

  const getCompany = async () => {
    setLoading(true);
    const res = await apiService.get(`/Company`);
    if (res.status === 200) {
      const { data } = res.data;
      setCompany(data);
    }
    setLoading(false);
  };

  const values = {
    company,
    loading,
    getCompany,
    setCompany,
  };

  return (
    <CompanyContext.Provider value={values}>{children}</CompanyContext.Provider>
  );
};
