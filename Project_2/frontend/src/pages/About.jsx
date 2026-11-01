// src/pages/About.jsx
// Practical Concept: Practical 1 & Practical 2 (Static Multi-page Routing & Component Structuring)

import React from "react";
import Header from "../components/Header";

function About() {
  return (
    <div>
      <Header
        title="About Event Management System"
        subtitle="Full-stack web application developed using React, Node.js, Express and MongoDB"
      />

      <div className="form-card">
        <h3>🎯 About Event Management System</h3>
        <p style={{ marginTop: "0.5rem", color: "var(--text-muted)", lineHeight: "1.8" }}>
          This Event Management System is a full-stack web application
          developed using React, Node.js, Express and MongoDB.
        </p>

        <p style={{ marginTop: "0.5rem", color: "var(--text-muted)", lineHeight: "1.8" }}>
          Users can view available events, while the administrator can
          create, edit and delete events.
        </p>

        <h3 style={{ marginTop: "1.5rem" }}>🏗️ Architecture Overview</h3>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem", lineHeight: "1.8" }}>
          <li>
            <strong>Presentation Layer (React Frontend):</strong> Handles user interactions,
            client-side routing with React Router DOM, form validations, and asynchronous API calls.
          </li>
          <li>
            <strong>Application Layer (Express Backend):</strong> Exposes RESTful JSON endpoints,
            handles request logging, checks business logic, and delegates database requests.
          </li>
          <li>
            <strong>Data Layer (MongoDB Database):</strong> Persists event document records reliably
            with Mongoose schema schemas and validation rules.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
