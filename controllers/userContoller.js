const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.message.startsWith("E11000")) {
      return res.status(400).json({ error: "Username already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

// login user with username and password
exports.loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + " " + password);
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Invalid username" });
    }
    if (user.password !== password) {
      return res.status(404).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).header("auth-token", token).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update user password
exports.updateUser = async (req, res) => {
  try {
    // const username = req.body.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ error: "New password cannot be the same as old password" });
    }
    //check if old password is correct
    const correctPassword = await User.findOne({
      _id: req.params.id,
      password: oldPassword,
    });
    if (!correctPassword) {
      return res.status(404).json({ error: "Invalid password" });
    }
    const password = newPassword;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { password },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
