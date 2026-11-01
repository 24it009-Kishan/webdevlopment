// src/components/ErrorMessage.jsx
// Practical Concept: Practical 3 (Error State UI Component)

import React from "react";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div>
        <strong>⚠️ Error: </strong>
        <span>{message || "An unexpected error occurred."}</span>
      </div>
      {onRetry && (
        <button className="btn btn-secondary btn-sm" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
