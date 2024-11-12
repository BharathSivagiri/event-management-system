import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/apiLinks';

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ customName: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId); 
      setIsAuthenticated(true);
      navigate('/events');
    } catch (error) {
      alert('Login failed');
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={credentials.customName}
            onChange={(e) => setCredentials({...credentials, customName: e.target.value})}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth 
            style={{ marginTop: '1rem' }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
