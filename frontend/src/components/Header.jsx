// src/components/Header.jsx
// Practical Concept: Practical 1 (Reusable Functional Component with Props)

import React from "react";

function Header({ title, subtitle }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export default Header;
