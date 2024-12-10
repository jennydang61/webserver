const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// Add a review
router.post("/add", reviewController.addReview);

// Get all reviews for a user
router.get("/:user_ID", reviewController.getReviews);

module.exports = router;
