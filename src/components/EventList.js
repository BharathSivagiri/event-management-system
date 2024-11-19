import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/apiLinks";
import { MESSAGES } from "../constants/messages";
import { buildUrlWithParams } from "../utils/queryUtils";
import { useDebounce } from "../hooks/useDebounce";
import { EventDialog } from "./EventDialog";
import EventRegistration from "./EventRegistration";

const EventList = () => {
  // State management for events, filters, and UI controls
  const [events, setEvents] = useState([]); // Stores the list of events
  const [filters, setFilters] = useState({
    searchKeyword: "",
    dateA: "",
    dateB: "",
    status: "",
  }); // Filter criteria
  const [selectedEvent, setSelectedEvent] = useState(null); // Currently selected event for viewing/editing
  const [showRegistration, setShowRegistration] = useState(false); // Controls registration modal visibility
  const [selectedEventForRegistration, setSelectedEventForRegistration] =
    useState(null); // Event selected for registration
  const isAdmin = localStorage.getItem("userId") === "1"; // Check if current user is admin
  const navigate = useNavigate();
  const debouncedFilters = useDebounce(filters, 500); // Debounce filter changes to prevent excessive API calls

  // Fetch events based on current filters
  const fetchEvents = useCallback(async () => {
    try {
      // Build query parameters based on filters
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;
        if (key === "searchKeyword") params.append("keyword", value);
        else if (key.includes("date"))
          params.append(key, value.replace(/-/g, "")); // Format dates
        else if (key === "status" && isAdmin) params.append("status", value);
      });
      // Non-admin users can only see active events
      if (!isAdmin) params.append("status", "active");

      // Make API call with authentication headers
      const { data } = await axios.get(
        buildUrlWithParams(API_ENDPOINTS.VIEW_EVENTS, params),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      );
      setEvents(data);
    } catch (error) {
      console.error(MESSAGES.FETCH_ERROR, error);
    }
  }, [filters, isAdmin]);

  // Fetch events when filters change
  useEffect(() => {
    fetchEvents();
  }, [debouncedFilters, fetchEvents]);

  // Handle event deletion (admin only)
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(
        API_ENDPOINTS.DELETE_EVENT.replace(":eventId", eventId),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      );
      fetchEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error(MESSAGES.DELETE_ERROR, error);
    }
  };

  // Update filter values
  const handleFilterChange = (field, value) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  // Close registration modal
  const closeRegistration = () => {
    setShowRegistration(false);
    setSelectedEventForRegistration(null);
  };

  // Handle event card click for viewing details or registration
  const handleCardClick = (event) => {
    setSelectedEvent(event);
    if (!isAdmin) {
      setSelectedEventForRegistration(event);
    }
  };

  // Get styles for status indicators
  const getStatusStyles = (status) => ({
    color:
      status === "active"
        ? "success.main"
        : status === "inactive"
          ? "error.main"
          : "text.secondary",
    backgroundColor:
      status === "active"
        ? "success.light"
        : status === "inactive"
          ? "error.light"
          : "grey.100",
  });

  return (
    <Container>
      {/* Main container with elevation and padding */}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        {/* Header section with title and create button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4">Events</Typography>
          {/* Create Event button only visible to admin */}
          {isAdmin && (
            <Button
              variant="contained"
              onClick={() => navigate("/create-event")}
            >
              Create Event
            </Button>
          )}
        </Box>

        {/* Filter section with responsive layout */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          {/* Search input field */}
          <TextField
            fullWidth
            label="Search Events"
            value={filters.searchKeyword}
            onChange={(e) =>
              handleFilterChange("searchKeyword", e.target.value)
            }
          />

          {/* Date range filters */}
          {["dateA", "dateB"].map((date) => (
            <TextField
              key={date}
              fullWidth
              type="date"
              label={date === "dateA" ? "From Date" : "To Date"}
              value={filters[date]}
              onChange={(e) => handleFilterChange(date, e.target.value)}
              sx={{
                "& .MuiInputLabel-root": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              }}
            />
          ))}

          {/* Status filter dropdown (admin only) */}
          {isAdmin && (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                {["", "active", "inactive"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status || "All"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>

        {/* Event cards grid with responsive layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {events.map((event) => (
            <Card
              key={event.eventId}
              onClick={() => handleCardClick(event)}
              sx={{ cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}
            >
              <CardContent>
                {/* Event header with name and status */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">{event.eventName}</Typography>
                  {/* Status badge for admin */}
                  {isAdmin && (
                    <Typography
                      variant="caption"
                      sx={{
                        ...getStatusStyles(filters.status),
                        fontWeight: "bold",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {filters.status?.toUpperCase() || "ALL"}
                    </Typography>
                  )}
                </Box>
                <Typography>Date: {event.eventDate}</Typography>
                <Typography>Fee: ₹ {event.eventFee}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Registration modal with animation */}
        {showRegistration && selectedEventForRegistration && (
          <Paper
            elevation={3}
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 600,
              maxHeight: "90vh",
              overflow: "auto",
              zIndex: 1000,
              p: 3,
              animation: "fadeIn 0.3s ease-in-out",
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translate(-50%, -48%)" },
                "100%": { opacity: 1, transform: "translate(-50%, -50%)" },
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={closeRegistration}>Close</Button>
            </Box>
            <EventRegistration
              eventId={selectedEventForRegistration.eventId}
              eventFee={selectedEventForRegistration.eventFee}
            />
          </Paper>
        )}

        {/* Event details dialog */}
        <EventDialog
          event={selectedEvent}
          isAdmin={isAdmin}
          onClose={() => setSelectedEvent(null)}
          onDelete={handleDelete}
          onEventUpdate={fetchEvents}
          setShowRegistration={setShowRegistration}
          setSelectedEventForRegistration={setSelectedEventForRegistration}
        />
      </Paper>
    </Container>
  );
};

export default EventList;
