import React from 'react';
import EventList from '../components/EventList';
import { useNavigate } from 'react-router-dom';

function EventListPage({ events, onSelectEvent }) {
  const navigate = useNavigate();

  const handleSelect = (event) => {
    onSelectEvent(event);
    navigate(`/events/${event.id}`);
  };

  return (
    <div>
      <h2>Event List</h2>
      <EventList events={events} onSelect={handleSelect} />
    </div>
  );
}

export default EventListPage;
