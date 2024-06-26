import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/main/components/sidebar";
import Navbar from "../../components/layout/main/components/navbar";
import { sidebarItems } from "./sidebarItems";
import { UserContext } from "@/store/UserContext";

export default function Index() {
  const navigate = useNavigate();
  const { user: currentUser, loading } = useContext(UserContext);

  useEffect(() => {
    console.log("geldi", currentUser);
    console.log("geldi", currentUser?.role !== "Admin");
    console.log("geldi", loading);

    if ((!currentUser || currentUser?.role !== "Admin") && !loading) {
      navigate("/auth/login");
    }
  }, [currentUser, loading]);
  console.log("loading", loading);

  if (currentUser?.role !== "Admin") return null;

  return (
    <>
      <Sidebar items={sidebarItems} color="#24272b" />
      <div id="forPadding" className="main">
        <Navbar isAdmin />
        <div style={{ paddingTop: "80px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
