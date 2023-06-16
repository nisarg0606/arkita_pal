const express = require("express");
const router = express.Router();
const userController = require("../controllers/userContoller");

// Create a new user
router.post("/", userController.createUser);

// Login user
router.post("/login", userController.loginUser);

// Update user password
router.put("/:id", userController.updateUser);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
