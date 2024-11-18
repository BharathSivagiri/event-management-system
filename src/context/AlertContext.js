import React, { createContext, useState, useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showAlert = (message, severity = 'success') => {
    setAlert({
      open: true,
      message,
      severity
    });
  };

  const handleClose = () => {
    setAlert(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionProps={{ direction: 'left' }}
      >
        <Alert 
          onClose={handleClose} 
          severity={alert.severity}
          variant="filled"
          elevation={6}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
