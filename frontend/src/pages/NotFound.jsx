// src/pages/NotFound.jsx
// Practical Concept: Practical 2 (404 Fallback Route in React Router)

import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1 style={{ fontSize: "5rem", color: "var(--primary)" }}>404</h1>
      <h2 style={{ marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
