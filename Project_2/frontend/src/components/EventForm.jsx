// src/components/EventForm.jsx
// Practical Concept: Practical 2 - useState and Controlled Form

import React, { useState, useEffect } from "react";
import AIDescriptionField from "./AIDescriptionField";

function EventForm({
  onSubmit,
  initialData = null,
  onCancel = null,
  isEditing = false,
}) {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    category: "Technology",
    status: "Upcoming",
  });

  // Fill form when editing an event
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        eventDate: initialData.eventDate
          ? initialData.eventDate.split("T")[0]
          : "",
        location: initialData.location || "",
        category: initialData.category || "Technology",
        status: initialData.status || "Upcoming",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        eventDate: "",
        location: "",
        category: "Technology",
        status: "Upcoming",
      });
    }
  }, [initialData]);

  // Update form state
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Event title is required!");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="form-card">
      <h3>
        {isEditing ? "✏️ Edit Event" : "➕ Create New Event"}
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Event Title */}
        <div className="form-group">
          <label>Event Title *</label>

          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* AI-powered Description */}
        <div className="form-group">
          <AIDescriptionField
            title={formData.title}
            value={formData.description}
            onChange={(newDesc) =>
              setFormData((prev) => ({ ...prev, description: newDesc }))
            }
          />
        </div>

        <div className="form-row">
          {/* Event Date */}
          <div className="form-group">
            <label>Event Date *</label>

            <input
              type="date"
              name="eventDate"
              className="form-control"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location *</label>

            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          {/* Category */}
          <div className="form-group">
            <label>Category *</label>

            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Technology">Technology</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Education">Education</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Event" : "Create Event"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EventForm;
