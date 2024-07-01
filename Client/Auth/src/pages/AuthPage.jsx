import React, { useState } from 'react';
import './AuthPage.css'; // Ensure this CSS file is created
import logo from '../assets/TLfill.png'
import { Typography } from '@mui/material';
const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example: Replace with actual authentication logic (e.g., API call to backend)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setLoggedIn(true);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };



  return (
    <div className="auth-container">
      <div className="auth-card">
      <h1 style={{fontFamily:'poppins'}}> MentorLion</h1>
        <img style={{borderRadius:20}}src={logo} alt="MentorLion" className="auth-logo" />
        
        <h2>Log in <span role="img" aria-label="wave">👋</span></h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-input">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="auth-input">
            <label>Password *</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <div className="auth-links">
          <a href="/forgot-password">Forgot password?</a>
          <hr className="auth-divider" />
          <button className="auth-button google-oauth">Log in with Google</button>
          <p>New to MentorLion? <a href="/signup">Create Free Account</a></p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
