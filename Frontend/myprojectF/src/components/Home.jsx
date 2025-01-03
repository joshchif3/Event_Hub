import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../service/api"; // Adjust path based on your structure
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

    const filtered = featuredEvents.filter((event) =>
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
        <p>Your go-to platform for discovering and organizing events in your area.</p>
      </header>

 
      <div className="categories">
        <h2>Explore Events by Category</h2>
        <div className="category-cards">
          {["technology", "business", "music", "sport"].map((category) => (
            <div className="category-card" key={category}>
              <img
                src={`/${category}.jpg`}
                alt={category.charAt(0).toUpperCase() + category.slice(1)}
                className="animated-card"
              />
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="search-section">
        <h2>Search Events</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for events..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="featured-events">
        <h2>Featured Events</h2>
        <div className="event-slider">
          {filteredEvents.slice(0, 6).map((event, index) => (
            <div className="event-slide" key={event.id}>
              <img src={event.image || "https://via.placeholder.com/300x200"} alt={event.title} />
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <Link to={`/events/${event.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
       
        <div className="additional-info">
          <h3>Why Attend Community Events?</h3>
          <p>Community events are a great way to connect with like-minded people, learn new things, and share experiences. Join us and be part of something special!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
