import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Header.css';
import { FaUser } from 'react-icons/fa'; // Importing user icon from react-icons

const Header = ({ isLoggedIn }) => {
  return (
    <div className="header">
      
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
        </ul>
      </nav>
      <div className="user-icon">
        {isLoggedIn ? (
          <Link to="/profile">
            <FaUser className="icon" />
          </Link>
        ) : (
          <Link to="/login">
            <FaUser className="icon" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
