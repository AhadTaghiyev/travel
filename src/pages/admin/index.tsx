import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/main/components/sidebar";
import Navbar from "../../components/layout/main/components/navbar";
import { sidebarItems } from "./sidebarItems";

export default function Index() {
  const navigate = useNavigate();
  // const { user: currentUser } = useContext(UserContext);
  // console.log(currentUser);

  useEffect(() => {
    localStorage.getItem("role") !== "Admin" && navigate("/auth/login");
  }, []);

  return (
    <>
      <Sidebar items={sidebarItems} color="rgb(42 98 137)" />
      <div style={{ paddingLeft: "228px" }}>
        <Navbar isAdmin />
        <div style={{ paddingTop: "80px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
