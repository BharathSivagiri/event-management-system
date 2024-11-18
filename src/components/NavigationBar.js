import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAlert } from '../context/AlertContext';
import { MESSAGES } from '../constants/messages';

const NavigationBar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleLogoutClick = () => {
    handleLogout();
    showAlert(MESSAGES.LOGOUT_SUCCESS, 'success');
  };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Event Management System
        </Typography>
        {isAuthenticated && (
          <>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>Home</Button>
            <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;