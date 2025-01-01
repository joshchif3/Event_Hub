import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import CalendarPage from './components/CalendarPage';
import EventsPage from './components/EventsPage';
import EventDetails from './components/EventDetails';
import EventOrganizerPage from './components/EventOrganizerPage';
import CreateEventPage from './components/CreateEventPage';
import AdminUserPage from './components/AdminUserPage'; // Import AdminUserPage
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        window.location.href = '/login';
      }
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/calendar" element={isLoggedIn ? <CalendarPage /> : <Navigate to="/login" />} />
          <Route path="/events" element={isLoggedIn ? <EventsPage /> : <Navigate to="/login" />} />
          <Route path="/events/:id" element={isLoggedIn ? <EventDetails /> : <Navigate to="/login" />} />
          <Route path="/organizer" element={isLoggedIn ? <EventOrganizerPage user={currentUser} /> : <Navigate to="/login" />} />
          <Route path="/create-event" element={isLoggedIn ? <CreateEventPage /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isLoggedIn ? <AdminUserPage /> : <Navigate to="/login" />} /> {/* Add AdminUserPage route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
