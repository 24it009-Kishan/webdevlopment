// src/pages/EventDetails.jsx
// Practical Concept: Practical 2 and Practical 3

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getEventById } from "../api";

function EventDetails() {
  // Get ID from URL
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getEventById(id);

      setEvent(response.data);
    } catch (err) {
      setError(err.message || "Failed to load event.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchEvent();
  }, [id]);


  if (loading) {
    return <Loading message="Loading event details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchEvent} />;
  }

  if (!event) {
    return null;
  }


  return (
    <div>
      <Header
        title={event.title}
        subtitle="Event details"
      />

      <div className="form-card">
        <h2>{event.title}</h2>

        <p>
          <strong>Description:</strong>
          <br />
          {event.description || "No description available."}
        </p>

        <p>
          <strong>Event Date:</strong>{" "}
          {new Date(event.eventDate).toLocaleDateString()}
        </p>

        <p>
          <strong>Location:</strong> {event.location}
        </p>

        <p>
          <strong>Category:</strong> {event.category}
        </p>

        <p>
          <strong>Status:</strong> {event.status}
        </p>

        <Link to="/events" className="btn btn-secondary">
          ← Back to Events
        </Link>
      </div>
    </div>
  );
}

export default EventDetails;
