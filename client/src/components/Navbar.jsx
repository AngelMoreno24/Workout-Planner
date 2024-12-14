import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
  };

  return (
      <div>
          <ul>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/workouts">Workouts</a></li>
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
          </ul>
      </div>
  );
};

export default Navbar
