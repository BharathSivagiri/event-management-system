import React from 'react';
import EventDetail from '../components/EventDetail';
import { useParams } from 'react-router-dom';

function EventDetailPage({ events }) {
  const { id } = useParams();
  const event = events.find((event) => event.id === parseInt(id));

  return (
    <div>
      <h2>Event Details</h2>
      <EventDetail event={event} />
    </div>
  );
}

export default EventDetailPage;
