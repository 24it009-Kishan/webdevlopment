// src/pages/admin/ManageEvents.jsx
// Practical Concept: Practical 3, 4, 5 and 6
// Complete Event CRUD interface

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import EventForm from "../../components/EventForm";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../api";


function ManageEvents() {
  // State variables
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);


  // READ all events
  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getEvents();

      setEvents(response.data || []);
    } catch (err) {
      setError(err.message || "Could not fetch events.");
    } finally {
      setLoading(false);
    }
  };


  // Fetch events when page loads
  useEffect(() => {
    fetchAllEvents();
  }, []);


  // CREATE event
  const handleCreate = async (formData) => {
    try {
      setLoading(true);

      const response = await createEvent(formData);

      setEvents((prev) => [response.data, ...prev]);

      setShowForm(false);
    } catch (err) {
      alert(`Error creating event: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  // UPDATE event
  const handleUpdate = async (formData) => {
    try {
      setLoading(true);

      const response = await updateEvent(
        editingEvent._id,
        formData
      );

      setEvents((prev) =>
        prev.map((event) =>
          event._id === editingEvent._id
            ? response.data
            : event
        )
      );

      setEditingEvent(null);
      setShowForm(false);
    } catch (err) {
      alert(`Error updating event: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  // DELETE event
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      await deleteEvent(id);

      setEvents((prev) =>
        prev.filter((event) => event._id !== id)
      );
    } catch (err) {
      alert(`Error deleting event: ${err.message}`);
    }
  };


  // Start editing
  const startEditing = (event) => {
    setEditingEvent(event);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // Cancel form
  const cancelForm = () => {
    setEditingEvent(null);
    setShowForm(false);
  };


  return (
    <div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header
          title="Manage Events"
          subtitle="Create, edit and delete events"
        />

        <Link
          to="/admin"
          className="btn btn-secondary btn-sm"
          style={{ height: "fit-content" }}
        >
          ← Back to Dashboard
        </Link>
      </div>


      {/* Show or hide Event Form */}
      <div style={{ marginBottom: "1.5rem" }}>
        {!showForm ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingEvent(null);
              setShowForm(true);
            }}
          >
            ➕ Add New Event
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={cancelForm}
          >
            ✕ Close Form
          </button>
        )}
      </div>


      {/* Event Form */}
      {showForm && (
        <EventForm
          isEditing={Boolean(editingEvent)}
          initialData={editingEvent}
          onSubmit={
            editingEvent
              ? handleUpdate
              : handleCreate
          }
          onCancel={cancelForm}
        />
      )}


      {/* Loading */}
      {loading && (
        <Loading message="Syncing with database..." />
      )}


      {/* Error */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={fetchAllEvents}
        />
      )}


      {/* Events Table */}
      {!loading && !error && (
        <div className="table-container">
          <table className="data-table">

            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Category</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                    }}
                  >
                    No events found. Click
                    <strong> "➕ Add New Event" </strong>
                    to create one.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event._id}>

                    <td>
                      <strong>{event.title}</strong>
                    </td>

                    <td>
                      {new Date(
                        event.eventDate
                      ).toLocaleDateString()}
                    </td>

                    <td>{event.location}</td>

                    <td>{event.category}</td>

                    <td>{event.status}</td>

                    <td style={{ textAlign: "right" }}>

                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => startEditing(event)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(event._id)
                        }
                        style={{ marginLeft: "0.5rem" }}
                      >
                        🗑 Delete
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default ManageEvents;
