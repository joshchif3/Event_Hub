import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styling/EventDetails.css";

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="event-details-container">
      <h1 className="event-title">{event.title}</h1>
      <p className="event-description">{event.description}</p>
      <img
        src={event.image ? `data:image/jpeg;base64,${event.image}` : "https://via.placeholder.com/300"}
        alt={event.title}
        className="event-image"
      />
      <div className="event-info">
        <p>
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Attendance Count:</strong> {event.attendanceCount}
        </p>
        <p>
          <strong>Category:</strong> {event.category}
        </p>
        <p>
          <strong>Organizer:</strong> {event.organizer}
        </p>
        <p>
          <strong>Maximum Participants:</strong> {event.maxParticipants}
        </p>
        <p>
          <strong>Is Paid:</strong> {event.isPaid ? "Yes" : "No"}
        </p>
        {event.isPaid && (
          <p>
            <strong>Price:</strong> ${event.price.toFixed(2)}
          </p>
        )}
        <p>
          <strong>Status:</strong> {event.status}
        </p>
      </div>
      <div className="map-container">
        <h2>Event Location</h2>
        <iframe
          title="Google Maps"
          src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="comments-section">
        <h2>User Comments</h2>
        {event.comments && event.comments.length > 0 ? (
          <ul>
            {event.comments.map((comment, index) => (
              <li key={index} className="comment-item">
                <p>
                  <strong>{comment.username}:</strong> {comment.text}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
