import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem("accessToken");

}

const Navbar = () => {
  return (
    <div>
        <ul>
            <li><a href="dashboard">Dashboard</a></li>
            <li><a href="workouts">Workouts</a></li>
            <li onClick={Logout}><a>Logout</a></li>
        </ul>
    </div>
  )
}

export default Navbar
