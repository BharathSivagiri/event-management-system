// Import necessary dependencies for the navigation bar
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAlert } from "../context/AlertContext";
import { MESSAGES } from "../constants/messages";

const NavigationBar = ({ isAuthenticated, handleLogout }) => {
  // Initialize navigation and alert hooks
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  // Handle logout with success message
  const handleLogoutClick = () => {
    handleLogout();
    showAlert(MESSAGES.LOGOUT_SUCCESS, "success");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Application title */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Event Management System
        </Typography>

        {/* Navigation buttons for authenticated users */}
        {isAuthenticated && (
          <>
            <Button color="inherit" onClick={() => navigate("/dashboard")}>
              Home
            </Button>
            <Button color="inherit" onClick={handleLogoutClick}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
