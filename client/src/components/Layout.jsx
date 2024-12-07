import React from 'react';
import { Outlet } from 'react-router-dom';
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <main className="layout-content">
        <Outlet/> {/* This will render the current page's content */}
      </main>
      <footer  className="layout-footer">© 2024 My Website</footer>
    </div>
  );
};

export default Layout;