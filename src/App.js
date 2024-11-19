import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
import EventRegistration from "./components/EventRegistration";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./components/Dashboard";
import MyRegistrations from "./components/MyRegistrations";
import AdminRegistrations from "./components/AdminRegistrations";
import { AlertProvider } from "./context/AlertContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AlertProvider>
      <Router>
        <NavigationBar
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Login setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/events"
            element={isAuthenticated ? <EventList /> : <Navigate to="/" />}
          />
          <Route
            path="/create-event"
            element={
              isAuthenticated ? (
                <CreateEvent setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/event-registration/:eventId"
            element={
              isAuthenticated ? <EventRegistration /> : <Navigate to="/" />
            }
          />
          <Route path="/my-registrations" element={<MyRegistrations />} />
          <Route path="/admin/registrations" element={<AdminRegistrations />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
}
export default App;
