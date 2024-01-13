import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/main/components/sidebar';
import Navbar from '../../components/layout/main/components/navbar';
import { sidebarItems } from './sidebarItems';
import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function index() {

  useEffect(()=> {
    if(!localStorage.getItem("token"))
      navigate("/auth")
  }, [])

  const navigate = useNavigate();

  return (
    <>
          <Sidebar  items={sidebarItems} color="#24272b" />
          <div id='forPadding' style={{ 
            width: '80%',
            position: 'absolute',
            right: 0 }}>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
              <Outlet />
            </div>
          </div>
    </>
  );
}
