// App.jsx
import React from 'react';
import {  Box } from '@mui/material';
import Header from './components/header';
import Drawer from './components/drawer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div />
      </Box>
    </Box>
  );
}

export default App;
