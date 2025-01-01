import React, { useState } from 'react';
import { getUserByEmail } from "../service/api";
import { useNavigate } from 'react-router-dom';
import "../styling/LoginPage.css"; // Import the CSS file

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await getUserByEmail(email);

      if (!user) {
        setErrorMessage('User not found. Please sign up.');
        return;
      }

      if (user.password === password) {
        localStorage.setItem('user', JSON.stringify(user)); // Store user as JSON
        setIsLoggedIn(true);

        // Redirect based on the user's role
        if (user.role === 'ADMIN') {
          navigate('/admin'); // Redirect to Admin User Page
        } else if (user.role === 'EVENT_ORGANIZER') {
          navigate('/organizer'); // Redirect to Event Organizer Page
        } else {
          navigate('/'); // Redirect to Home Page
        }
      } else {
        setErrorMessage('Invalid password. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error during login. Please try again.');
      console.error("Error fetching user:", error);
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page-container">
      <div className="main">
        {/* Add the logo image */}
        <img
          src="/logo.jpeg"
          alt="Logo"
          className="login-logo"
        />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <h3>Don't have an account?</h3>
        <button onClick={goToSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
