// src/pages/Contact.jsx
// Practical Concept: Practical 2 (Controlled Form Input & Real-Time useState Demonstration)

import React, { useState } from "react";
import Header from "../components/Header";

function Contact() {
  // Controlled component states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Handle contact form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <Header
        title="Contact Event Management System"
        subtitle="Demonstrating controlled inputs and real-time state management"
      />

      <div className="form-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <h3 style={{ color: "var(--success)" }}>✅ Message Received!</h3>
            <p style={{ marginTop: "0.5rem" }}>
              Thank you <strong>{name}</strong>. Your feedback has been noted.
            </p>
            <button
              className="btn btn-secondary"
              style={{ marginTop: "1.25rem" }}
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setMessage("");
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message (Controlled State Input)</label>
              <textarea
                id="message"
                className="form-control"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Real-Time Preview Box */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px dashed #cbd5e1",
                borderRadius: "6px",
                padding: "0.75rem 1rem",
                marginBottom: "1.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>⚡ Real-time State Preview:</strong>
              <p style={{ color: "var(--text-muted)", marginTop: "0.25rem" }}>
                {message ? message : "Start typing in the message box to see live preview..."}
              </p>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
