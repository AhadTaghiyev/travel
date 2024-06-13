import { ROLES } from "@/constants";
import { UserContext } from "@/store/UserContext";
import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ManagementOnly = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (
      !user ||
      (user.role !== ROLES.LEADER && user.role !== ROLES.ACCOUNTANT&&user.role!=ROLES.Admin)
    ) {
      navigate(-1);
    }
  }, [loading, user]);

  if (!user || (user.role !== ROLES.LEADER && user.role !== ROLES.ACCOUNTANT&&user.role!=ROLES.Admin))
    return null;

  return <>{children}</>;
};

export const LeaderOnly = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== ROLES.LEADER&&user.role!=ROLES.Admin) {
      navigate(-1);
    }
  }, [loading, user]);

  if (!user || user.role !== ROLES.LEADER&&user.role!=ROLES.Admin) return null;

  return <>{children}</>;
};
