// backend/models/Event.js
// Practical Concept: Practical 5 - Mongoose Schema and Validation

const mongoose = require("mongoose");

// Create Event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true,
  },

  description: {
    type: String,
    default: "",
  },

  eventDate: {
    type: Date,
    required: [true, "Event date is required"],
  },

  location: {
    type: String,
    required: [true, "Event location is required"],
    trim: true,
  },

  category: {
    type: String,
    required: [true, "Event category is required"],
    trim: true,
  },

  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
    default: "Upcoming",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Event model
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
