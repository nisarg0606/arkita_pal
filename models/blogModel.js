const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3,
  },
  date: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    default: () => {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString("default", { month: "long" });
      const year = currentDate.getFullYear();
      return `${day} ${month} ${year}`;
    },
  },
  image: {
    type: String,
    required: true,
    unique: false,
    imgType: String,
    trim: true,
  },
  imgType: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
