import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../service/api";
import "../styling/HomePage.css";

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setFeaturedEvents(events);
      setFilteredEvents(events);
    };
    fetchEvents();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = featuredEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.category.toLowerCase().includes(query.toLowerCase()) ||
        event.organizer.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <div className="home">
      <header className="hero-section">
        <h1>Welcome to Community Event Hub</h1>
        <p>Discover and organize events in your area.</p>
      </header>

      <div className="categories">
        <h2>Events Categories</h2>
        <div className="category-cards">
          {["technology", "business", "music", "sport"].map((category) => (
            <div className="category-card" key={category}>
              <img
                src={`/${category}.jpg`}
                alt={category.charAt(0).toUpperCase() + category.slice(1)}
              />
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="featured-events">
        <h2>Featured Events</h2>
        <div className="event-grid">
          {filteredEvents.slice(0, 4).map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-image">
                {event.image ? (
                  <img
                    src={`data:image/png;base64,${event.image}`}
                    alt={event.title}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300x200"
                    alt="Placeholder"
                  />
                )}
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>{event.date}</p>
                <p>{event.location}</p>
                <p>Organized by {event.organizer}</p>
                <Link to={`/events/${event.id}`} className="btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="see-more">
          <Link to="/events" className="btn see-more-btn">
            See More Events
          </Link>
        </div>
      </div>

      <div className="about-section">
        <h2>About Us</h2>
        <p>
          Welcome to Community Event Hub! We help you discover exciting
          events in your area and provide a platform for event organizers to
          showcase their events. Whether you are looking to attend an event or
          organize one, we are here to make it happen!
        </p>
      </div>
    </div>
  );
};

export default Home;
