import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>

      <span className="group-title">Artisan:</span>
      <NavLink to="/login" className="nav-link">
        Login
      </NavLink>
      <NavLink to="/register" className="nav-link">
        Register
      </NavLink>

      <span className="group-title">User:</span>
      <NavLink to="/user/login" className="nav-link">
        Login
      </NavLink>
      <NavLink to="/user/register" className="nav-link">
        Register
      </NavLink>

      <span className="group-title">Admin:</span>
      <NavLink to="/admin/login" className="nav-link">
        Login
      </NavLink>
    </nav>
  );
};

export default Navbar;
