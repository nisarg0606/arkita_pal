const moongoose = require("mongoose");

const serviceSchema = new moongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  image: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3,
  },
  imgType: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = moongoose.model("Service", serviceSchema);
