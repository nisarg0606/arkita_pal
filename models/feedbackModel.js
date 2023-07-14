const moongoose = require("mongoose");

const feedbackSchema = new moongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    unique: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = moongoose.model("Feedback", feedbackSchema);