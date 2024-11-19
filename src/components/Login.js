import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/apiLinks";
import { useAlert } from "../context/AlertContext";
import { MESSAGES } from "../constants/messages";

const Login = ({ setIsAuthenticated }) => {
  // State management for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to authenticate user
      const { data } = await axios.post(API_ENDPOINTS.LOGIN, {
        customName: username,
        password: password,
      });

      // Store authentication data
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      setIsAuthenticated(true);

      // Show success message and redirect
      showAlert(MESSAGES.LOGIN_SUCCESS, "success");
      navigate("/dashboard");
    } catch (error) {
      showAlert(error.response?.data?.message || MESSAGES.LOGIN_ERROR, "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Username input field */}
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Password input field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Submit button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
