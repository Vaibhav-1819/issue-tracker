// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = ({ user, onLogout }) => {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
