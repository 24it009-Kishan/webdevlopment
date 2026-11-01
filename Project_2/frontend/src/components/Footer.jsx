// src/components/Footer.jsx
// Practical Concept: Practical 1 (Static UI Component)

import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="nav-container" style={{ justifyContent: "center" }}>
        <p>
          Full-Stack Management System Template &copy; {new Date().getFullYear()} • Built for AWDF Practicals
        </p>
      </div>
    </footer>
  );
}

export default Footer;
