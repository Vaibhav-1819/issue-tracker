// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBug, FaChartBar, FaClock, FaHome, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar-custom">
      {/* Left: Brand */}
      <div className="navbar-brand-custom">
        <FaBug className="icon" />
        Issue Tracker
      </div>

      {/* Center: Navigation Links */}
      <div className="navbar-links">
        <Link to="/" className="nav-link"><FaHome className="icon" /> Dashboard</Link>
        <Link to="/tickets" className="nav-link"><FaBug className="icon" /> Tickets</Link>
        <Link to="/reports" className="nav-link"><FaChartBar className="icon" /> Reports</Link>
        <Link to="/worklog" className="nav-link"><FaClock className="icon" /> Worklog</Link>
      </div>

      {/* Right: Logout */}
      <div className="navbar-links">
        <span style={{ color: 'white', marginRight: '1rem' }}>{user?.name}</span>
        <button className="logout-button" onClick={() => {
          localStorage.removeItem('user');
          onLogout();
          navigate('/');
        }}>
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
