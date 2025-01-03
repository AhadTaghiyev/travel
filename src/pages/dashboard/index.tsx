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
    if (user && user.expireDate < 0 && location.pathname !== "/panel" && !location.pathname.includes("/panel/company/paymentConfirmation/")) {
      navigate("/panel");
    }
  }, [location.pathname, user]);

  const navigationItems = useMemo(() => {
    if (!user) return [];
    if (user.expireDate < 0) {
      return sidebarItems.slice(0, 1);
    }

    if (user.role !== ROLES.LEADER && user.role !== ROLES.ACCOUNTANT) {
      return sidebarItems.filter((item) => !item.onlyManagement) // Filter top-level items with onlyManagement set to false
        .map((item) => {
          if (item.children) {
            // If item has children, filter children with onlyManagement set to false
            const filteredChildren = item.children.filter(
              (child) => !child.onlyManagement
            );

            // Return a new object with filtered children if any child remains
            return { ...item, children: filteredChildren };
          }
          return item;
        })
        .filter((item) => !item.children || item.children.length > 0);
    }

    return sidebarItems;
  }, [user, user?.role]);

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
