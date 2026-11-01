// src/pages/Events.jsx
// Practical Concept: Practical 3 - useEffect, Fetch API and Dynamic Rendering

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getEvents } from "../api";

function Events() {
  // State variables
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getEvents();

      setEvents(response.data || []);
    } catch (err) {
      setError(
        err.message ||
        "Failed to load events. Make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };


  // Run once when component loads
  useEffect(() => {
    fetchEvents();
  }, []);


  return (
    <div>
      <Header
        title="Explore Events"
        subtitle="View all available events"
      />

      {loading && (
        <Loading message="Fetching events from the backend..." />
      )}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={fetchEvents}
        />
      )}

      {!loading && !error && events.length === 0 && (
        <div className="empty-state">
          <h3>No events found</h3>
          <p>Go to the Admin Panel and create your first event.</p>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="card-grid">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
