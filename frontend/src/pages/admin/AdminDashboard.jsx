// src/pages/admin/AdminDashboard.jsx
// Practical Concept: Practical 3 & Practical 6 (Data Dashboard & Aggregation with useEffect)

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getEvents } from "../../api";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getEvents();

      setEvents(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <Header
        title="Admin Dashboard"
        subtitle="Overview of application statistics and quick controls"
      />

      {loading && <Loading message="Loading dashboard statistics..." />}
      {error && <ErrorMessage message={error} onRetry={fetchDashboardData} />}

      {!loading && !error && (
        <>
          {/* Top Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-title">Total Events</span>
              <span className="stat-number">{events.length}</span>
            </div>

            <div className="stat-card">
              <span className="stat-title">Upcoming Events</span>
              <span className="stat-number">
                {events.filter((event) => event.status === "Upcoming").length}
              </span>
            </div>

            <div className="stat-card">
              <span className="stat-title">Completed Events</span>
              <span className="stat-number">
                {events.filter((event) => event.status === "Completed").length}
              </span>
            </div>
          </div>

          {/* Quick Actions & Recent Records */}
          <div className="form-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3>Recent Events (Latest 5)</h3>
              <Link to="/admin/events" className="btn btn-primary btn-sm">
                ⚙️ Manage All Events
              </Link>
            </div>

            {events.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>
                No events have been created yet.
              </p>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Event Date</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {events.slice(0, 5).map((event) => (
                      <tr key={event._id}>
                        <td>
                          <strong>{event.title}</strong>
                        </td>

                        <td>
                          {event.eventDate
                            ? new Date(event.eventDate).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td>{event.location}</td>

                        <td>
                          <span
                            className={`badge badge-status ${event.status}`}
                          >
                            {event.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
