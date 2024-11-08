import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddEventPage from './pages/AddEventPage';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';
import './index.css';

function App() {
  const initialEvents = [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: '2024-06-10',
      location: 'San Francisco, CA',
      description: 'A conference for tech enthusiasts to explore the latest trends in technology.',
      fee : '500.00',
    },
    {
      id: 2,
      name: 'Music Festival',
      date: '2024-08-20',
      location: 'Austin, TX',
      description: 'A weekend of live music featuring local and international artists.',
      fee : '1000.00',
    },
    // more sample events...
  ];

  const [events, setEvents] = useState(initialEvents);

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: events.length + 1 }]);
  };

  return (
    <Router>
      <div className="container">
        <h1>Event Management System</h1>
        <nav>
          <Link to="/add-event">Add Event</Link> |{' '}
          <Link to="/events">Event List</Link>
        </nav>
        <Routes>
          <Route path="/add-event" element={<AddEventPage onAddEvent={addEvent} />} />
          <Route path="/events" element={<EventListPage events={events} onSelectEvent={(event) => event} />} />
          <Route path="/events/:id" element={<EventDetailPage events={events} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
