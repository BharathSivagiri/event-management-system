import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import EventRegistration from './components/EventRegistration';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Event Management System
          </Typography>
          {isAuthenticated && (
            <>
              <Button color="inherit" href="/events">Events</Button>
              <Button color="inherit" href="/create-event">Create Event</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? 
            <Login setIsAuthenticated={setIsAuthenticated} /> : 
            <Navigate to="/events" />
          } 
        />
        <Route 
          path="/events" 
          element={isAuthenticated ? 
            <EventList /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/create-event" 
          element={isAuthenticated ? 
            <CreateEvent /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/register/:eventId" 
          element={isAuthenticated ? 
            <EventRegistration /> : 
            <Navigate to="/" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
