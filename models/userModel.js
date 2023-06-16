const moongoose = require("mongoose");

const userSchema = new moongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = moongoose.model("User", userSchema);
