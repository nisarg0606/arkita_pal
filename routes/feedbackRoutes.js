const express = require('express');
const router = express.Router();

const feedbackController = require('../controllers/feedbackController');

// Create a new feedback
router.post('/', feedbackController.createFeedback);

// Get all feedbacks
router.get('/', feedbackController.getAllFeedbacks);

// Get a single feedback by ID
router.get('/:id', feedbackController.getFeedbackById);

// Delete a feedback by ID
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;