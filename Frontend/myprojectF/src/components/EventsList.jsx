import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/EventList.css';

const EventsList = ({ events }) => {
  return (
    <div className="events-list">
      {events.length > 0 ? (
        events.map((event) => (
          <div className="event" key={event.id}>
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>${event.price}</p>
              <p>Organized by {event.organizer}</p>
            </div>

            {/* Conditionally display the image */}
            {event.image ? (
              <div className="event-image">
                <img src={`data:image/png;base64,${event.image}`} alt={event.title} />
              </div>
            ) : (
              <p>No image available</p>
            )}

            {/* Updated Link path */}
            <Link to={`/events/${event.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventsList;
