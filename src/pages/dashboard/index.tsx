import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/layout/main/components/sidebar";
import Navbar from "../../components/layout/main/components/navbar";
import { sidebarItems } from "./sidebarItems";
import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/store/UserContext";
import Loading from "@/components/custom/loading";
import { ROLES } from "@/constants";

export default function index() {
  const location = useLocation();
  const { loading, user } = useContext(UserContext);
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/auth/login");
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.expireDate < 0 && location.pathname !== "/panel") {
      navigate("/panel");
    }
  }, [location.pathname, user]);

  const navigationItems = useMemo(() => {
    if (!user) return [];
    if (user.expireDate < 0) {
      return sidebarItems.slice(0, 1);
    }

    if (user.role !== ROLES.LEADER && user.role !== ROLES.ACCOUNTANT) {
      return sidebarItems.filter((item) => !item.onlyManagement);
    }

    return sidebarItems;
  }, [user?.role]);

  if (loading || !user) return <Loading />;

  return (
    <>
      <Sidebar items={navigationItems} color="#24272b" />
      <div id="forPadding" className="main">
        <Navbar />
        <div style={{ paddingTop: "80px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
