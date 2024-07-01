// App.jsx
import React from 'react';
import {  Box } from '@mui/material';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

function App() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <AuthPage/>  
  );
}

export default App;
