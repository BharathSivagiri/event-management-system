import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavigationBar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Event Management System
        </Typography>
        {isAuthenticated && (
          <>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>Home</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
