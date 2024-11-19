import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/apiLinks";

const CreateEvent = () => {
  // Define initial state for the event form
  const initialState = {
    eventName: "",
    eventDescription: "",
    eventLocation: "",
    eventDate: "",
    eventCapacity: "",
    eventFee: "",
    eventStatus: "opened",
    recStatus: "active",
  };

  // State management using hooks
  const [eventData, setEventData] = useState(initialState);
  const [showSuccess, setShowSuccess] = useState(false); // Controls success message visibility
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Utility function to format date by removing hyphens
  const formatDate = (date) => date.replace(/-/g, "");

  // Handle input changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: name === "eventDate" ? formatDate(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to create event
      await axios.post(API_ENDPOINTS.ADD_EVENT, eventData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          userId: localStorage.getItem("userId"),
        },
      });
      // Show success message and redirect
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/events");
      }, 2000);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Utility function to render TextField components
  const renderTextField = (
    label,
    name,
    type = "text",
    multiline = false,
    rows = 1
  ) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      margin="normal"
      multiline={multiline}
      rows={rows}
      // Format date display for date fields
      value={
        name === "eventDate" && eventData[name]
          ? `${eventData[name].substring(0, 4)}-${eventData[name].substring(4, 6)}-${eventData[name].substring(6, 8)}`
          : eventData[name]
      }
      onChange={handleChange}
      InputLabelProps={type === "date" ? { shrink: true } : undefined}
    />
  );

  return (
    <Container maxWidth="sm">
      {/* Success message alert */}
      {showSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Event created successfully!
        </Alert>
      )}
      {/* Main form container */}
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Create Event
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Form fields rendered using utility function */}
          {renderTextField("Event Name", "eventName")}
          {renderTextField("Description", "eventDescription", "text", true, 4)}
          {renderTextField("Event Date", "eventDate", "date")}
          {renderTextField("Location", "eventLocation")}
          {renderTextField("Capacity", "eventCapacity", "number")}
          {renderTextField("Fee", "eventFee", "number")}
          {/* Submit button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Create Event
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateEvent;
