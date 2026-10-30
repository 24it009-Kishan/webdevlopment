// src/components/Loading.jsx
// Practical Concept: Practical 3 (Loading State UI Component)

import React from "react";

function Loading({ message = "Loading data from backend..." }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading;
