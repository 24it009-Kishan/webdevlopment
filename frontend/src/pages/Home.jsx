import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  return (
    <div>
      <div className="hero-section">
        <h1 className="hero-title">
          Event Management System
        </h1>

        <p className="hero-subtitle">
          A simple full-stack application for viewing and managing events.
          Built using React, Express and MongoDB.
        </p>

        <div className="hero-buttons">
          <Link to="/events" className="btn btn-light">
            Explore Events
          </Link>

          <Link
            to="/admin"
            className="btn btn-primary"
            style={{ border: "2px solid #ffffff" }}
          >
            Open Admin Panel
          </Link>
        </div>
      </div>

      <Header
        title="Event Management System"
        subtitle="Manage and explore events using a full-stack application"
      />

      <div className="feature-grid">
        <div className="feature-box">
          <h3>📅 View Events</h3>
          <p>
            Users can view available events and their information.
          </p>
        </div>

        <div className="feature-box">
          <h3>⚛️ React Frontend</h3>
          <p>
            React components, props, hooks and React Router are used.
          </p>
        </div>

        <div className="feature-box">
          <h3>🚀 Express API</h3>
          <p>
            REST APIs provide complete CRUD operations for events.
          </p>
        </div>

        <div className="feature-box">
          <h3>🍃 MongoDB</h3>
          <p>
            Event information is stored permanently in MongoDB.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
