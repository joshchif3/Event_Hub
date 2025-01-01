import React, { useState } from 'react';
import { createUser, getUserByEmail } from "../service/api";
import { useNavigate } from 'react-router-dom';
import "../styling/LoginPage.css";

const SignUpPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('NORMAL_USER');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const username = email.split('@')[0];

    const newUser = {
      username,
      email,
      password,
      firstName,
      lastName,
      role,
    };

    try {
      // Check if the user already exists by email
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        setErrorMessage('A user with this email already exists.');
        return;
      }

      // Proceed to create the user if no existing user found
      const createdUser = await createUser(newUser);

      if (createdUser) {
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(createdUser));

        // Redirect to appropriate page based on role
        if (role === 'EVENT_ORGANIZER') {
          navigate('/organizer');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setErrorMessage('Error creating user. Please try again.');
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="signup-page-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="NORMAL_USER">Normal User</option>
            <option value="EVENT_ORGANIZER">Event Organizer</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default SignUpPage;
