import React, { useState } from 'react';
import './AuthPage.css';
import logo from '../assets/TLfill.png'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset link has been sent to your email.');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
      <h1 style={{fontFamily:'poppins'}}> MentorLion</h1>
      <img style={{borderRadius:20}}src={logo} alt="MentorLion" className="auth-logo" />
        <h2>Reset Password</h2>
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
          {message && <p className="auth-message">{message}</p>}
          <button type="submit" className="auth-button">Send Reset Link</button>
        </form>
        <div className="auth-links">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
