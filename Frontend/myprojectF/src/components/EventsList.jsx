import React from "react";
import { Link } from "react-router-dom";
import "../styling/EventList.css";

const EventsList = ({ events }) => {
  return (
    <div className="events-list">
      {events.length > 0 ? (
        events.map((event) => (
          <div className="event-card" key={event.id}>
            <div className="event-image">
              {event.image ? (
                <img
                  src={`data:image/png;base64,${event.image}`}
                  alt={event.title}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="event-info">
              <h3>{event.title}</h3>
              <p className="description">{event.description}</p>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>${event.price}</p>
              <p>Organized by {event.organizer}</p>
              <Link to={`/events/${event.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventsList;
