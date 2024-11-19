// Import necessary dependencies for the alert context
import React, { createContext, useState, useContext } from "react";
import { Alert, Snackbar } from "@mui/material";

// Create context for alert management
const AlertContext = createContext();

// Alert Provider component
export const AlertProvider = ({ children }) => {
  // State management for alert properties
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Function to display alert with custom message and severity
  const showAlert = (message, severity = "success") => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  // Handle alert dismissal
  const handleClose = () => {
    setAlert((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {/* Snackbar component for alert display */}
      <Snackbar
        open={alert.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionProps={{ direction: "left" }}
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

// Custom hook for using alert context
export const useAlert = () => useContext(AlertContext);
