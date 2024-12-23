import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/add" className="navbar-link">
          Add Review
        </Link>
      
        <Link to="/view" className="navbar-link">
          View
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
