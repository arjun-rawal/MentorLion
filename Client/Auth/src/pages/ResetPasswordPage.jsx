import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AuthPage.css';
import logo from '../assets/TLfill.png'

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successfully. You can now log in.');
        setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
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
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-input">
            <label>New Password *</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="auth-input">
            <label>Confirm New Password *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-message">{message}</p>}
          <button type="submit" className="auth-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
