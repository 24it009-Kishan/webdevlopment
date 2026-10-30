// src/components/Auth.jsx
// Practical Concept: Practical 7 - User Authentication (Register/Login with JWT)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth({ onAuthSuccess = null }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const endpoint = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Authentication failed");
        setLoading(false);
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        setSuccessMessage("✅ Login successful! Redirecting...");
        if (onAuthSuccess) onAuthSuccess(data.token);
        setTimeout(() => {
          navigate("/admin/events");
        }, 1000);
      } else {
        setSuccessMessage("✅ Registration successful! Please login.");
        setIsLogin(true);
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error: Could not reach backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card" style={{ maxWidth: "450px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2>{isLogin ? "🔐 Login" : "📝 Create Account"}</h2>
        <p style={{ color: "var(--text-muted)", marginTop: "0.25rem" }}>
          {isLogin
            ? "Sign in to access admin controls and manage events"
            : "Register a new user account"}
        </p>
      </div>

      {errorMessage && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            padding: "0.75rem",
            borderRadius: "6px",
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}
        >
          ❌ {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          style={{
            backgroundColor: "#dcfce7",
            color: "#166534",
            padding: "0.75rem",
            borderRadius: "6px",
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email (e.g. user@example.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login 🚀" : "Register ✨"}
          </button>
        </div>
      </form>

      <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setErrorMessage("");
            setSuccessMessage("");
          }}
          style={{
            background: "none",
            border: "none",
            color: "var(--primary)",
            cursor: "pointer",
            fontWeight: "500",
            textDecoration: "underline",
          }}
        >
          {isLogin
            ? "Don't have an account? Create one"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
