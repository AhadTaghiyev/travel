import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/main/components/sidebar";
import Navbar from "../../components/layout/main/components/navbar";
import { sidebarItems } from "./sidebarItems";

export default function Index() {

  const navigate = useNavigate();

  useEffect(()=> {
    (localStorage.getItem("role") !== "Admin") && navigate("/auth")
  }, [])

  return (
    <>
            <Sidebar items={sidebarItems} color='rgb(42 98 137)'/>
            <div style={{paddingLeft : '228px'}}>
              <Navbar isAdmin={true}/>
              <div style={{paddingTop: '80px'}}>
                <Outlet/>
              </div>
            </div>
          
    </>
  )
}
