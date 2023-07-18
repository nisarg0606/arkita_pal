const express = require("express");
const router = express.Router();
const userController = require("../controllers/userContoller");
const auth = require("../middleware/auth");

// Create a new user
router.post("/", userController.createUser);

// Login user
router.post("/login", userController.loginUser);

// Update user password
router.put("/:id", auth, userController.updateUser);

// Delete user
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
