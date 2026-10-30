// src/components/EventCard.jsx
// Practical Concept: Practical 1 - Props and Reusable Components

import React from "react";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  // Format event date for display
  const formattedDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString()
    : "Date not available";

  return (
    <div className="item-card">
      <div className="card-header">
        <h3>{event.title}</h3>

        <span className={`badge badge-status ${event.status}`}>
          {event.status}
        </span>
      </div>

      <p className="card-desc">
        {event.description || "No description provided."}
      </p>

      <div className="card-meta">
        <span>📅 {formattedDate}</span>
        <span>📍 {event.location}</span>
        <span className="badge badge-category">
          📁 {event.category}
        </span>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Link
          to={`/events/${event._id}`}
          className="btn btn-primary btn-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
