import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/layout/main/components/sidebar";
import Navbar from "../../components/layout/main/components/navbar";
import { sidebarItems } from "./sidebarItems";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/store/UserContext";
import Loading from "@/components/custom/loading";

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

  if (loading || !user) return <Loading />;

  return (
    <>
      <Sidebar
        items={user.expireDate < 0 ? sidebarItems.slice(0, 1) : sidebarItems}
        color="#24272b"
      />
      <div id="forPadding" className="main">
        <Navbar />
        <div style={{ paddingTop: "80px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
