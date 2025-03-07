import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import logo from '../assets/TLfill.png'

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
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
