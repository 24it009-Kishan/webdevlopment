// src/App.jsx
// Practical 8: Performance Optimization and Lazy Loading
// React.lazy() + Suspense + Route-based Code Splitting

import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// =====================================================
// NORMAL COMPONENT IMPORTS
// These are small/persistent components, so they remain
// normally imported.
// =====================================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./components/Auth";

// =====================================================
// LAZY-LOADED USER PAGES
// These pages are loaded only when their route is visited.
// =====================================================

const Home = lazy(() => import("./pages/Home"));
const Events = lazy(() => import("./pages/Events"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

// =====================================================
// LAZY-LOADED 404 PAGE
// =====================================================

const NotFound = lazy(() => import("./pages/NotFound"));

// =====================================================
// LAZY-LOADED ADMIN PAGES
// =====================================================

const AdminDashboard = lazy(() =>
  import("./pages/admin/AdminDashboard")
);

const ManageEvents = lazy(() =>
  import("./pages/admin/ManageEvents")
);

// =====================================================
// LOADING COMPONENT
// Displayed while a lazy-loaded page is being downloaded.
// =====================================================

function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "500",
      }}
    >
      Loading page...
    </div>
  );
}

// =====================================================
// MAIN APP
// =====================================================

function App() {
  return (
    <Router>
      <div className="app-layout">

        {/* Navigation Bar visible on all pages */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="main-content">

          {/* 
            Suspense displays LoadingPage while React
            downloads the required lazy-loaded component.
          */}
          <Suspense fallback={<LoadingPage />}>

            <Routes>

              {/* ================= USER ROUTES ================= */}

              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/events"
                element={<Events />}
              />

              <Route
                path="/events/:id"
                element={<EventDetails />}
              />

              <Route
                path="/about"
                element={<About />}
              />

              <Route
                path="/contact"
                element={<Contact />}
              />

              {/* ================= AUTH ROUTES ================= */}

              <Route
                path="/login"
                element={<Auth />}
              />

              <Route
                path="/auth"
                element={<Auth />}
              />

              {/* ================= ADMIN ROUTES ================= */}

              <Route
                path="/admin"
                element={<AdminDashboard />}
              />

              <Route
                path="/admin/events"
                element={<ManageEvents />}
              />

              {/* ================= 404 ROUTE ================= */}

              <Route
                path="*"
                element={<NotFound />}
              />

            </Routes>

          </Suspense>

        </main>

        {/* Footer visible on all pages */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;