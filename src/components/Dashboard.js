import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AddCircleOutline,
  ManageSearch,
  Event,
  ListAlt,
  ListAltOutlined,
} from "@mui/icons-material";
import { useAlert } from "../context/AlertContext";

const Dashboard = () => {
  // Initialize navigation and get user role
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("userId") === "1";
  const { showAlert } = useAlert();

  // Handler for dashboard actions
  const handleAction = () => {
    try {
      showAlert("Operation successful!", "success");
    } catch (error) {
      showAlert("Something went wrong!", "error");
    }
  };

  // Styles for card animations and hover effects
  const cardStyle = {
    height: "100%",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
    },
  };

  // Styles for card content layout
  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  // Style for dashboard icons
  const iconStyle = { fontSize: 40, mb: 2, color: "primary.main" };

  // Define dashboard items based on user role
  const dashboardItems = isAdmin
    ? [
        // Admin dashboard options
        {
          icon: AddCircleOutline,
          title: "Create Event",
          desc: "Add new events to the system",
          path: "/create-event",
        },
        {
          icon: ManageSearch,
          title: "Manage Events",
          desc: "View, edit and delete events",
          path: "/events",
        },
        {
          icon: ListAltOutlined,
          title: "View Registrations",
          desc: "View all the registrations",
          path: "/admin/registrations",
        },
      ]
    : [
        // User dashboard options
        {
          icon: Event,
          title: "Browse Events",
          desc: "View and register for events",
          path: "/events",
        },
        {
          icon: ListAlt,
          title: "Cancel Event Registration",
          desc: "Cancel event registrations",
          path: "/my-registrations",
        },
      ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Dashboard title based on user role */}
      <Typography variant="h4" gutterBottom>
        {isAdmin ? "Admin Dashboard" : "User Dashboard"}
      </Typography>
      {/* Grid of dashboard cards */}
      <Grid container spacing={3}>
        {dashboardItems.map(({ icon: Icon, title, desc, path }) => (
          <Grid item xs={12} md={6} lg={3} key={title}>
            <Card sx={cardStyle} onClick={() => navigate(path)}>
              <CardContent sx={contentStyle}>
                <Icon sx={iconStyle} />
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
