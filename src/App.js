import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import EventRegistration from './components/EventRegistration';
import NavigationBar from './components/NavigationBar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <NavigationBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
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
            <CreateEvent setIsAuthenticated={setIsAuthenticated}/> : 
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