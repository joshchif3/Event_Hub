// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Header.css';

const Header = () => {
  return (
    <div className="header">
      <h1>Event Hub</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li> {/* Home link */}
          <li><Link to="/events">Events</Link></li> {/* Events link */}
          <li><Link to="/calendar">Calendar</Link></li> {/* Calendar link */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
