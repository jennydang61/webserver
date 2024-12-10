const Review = require("../model/review"); // Assuming a Review model exists

const addReview = async (req, res) => {
    const { reviewer_ID, reviewed_ID, rate, comment } = req.body;

    if (!reviewer_ID || !reviewed_ID || !rate) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const [result] = await Review.add(reviewer_ID, reviewed_ID, rate, comment);
        res.status(201).json({
            message: "Review added successfully!",
            review_ID: result.insertId,
        });
    } catch (err) {
        console.error("Error adding review:", err);
        res.status(500).json({ message: err.message });
    }
};

const getReviews = async (req, res) => {
    const { user_ID } = req.params;

    if (!user_ID) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const [reviews] = await Review.getAll(user_ID);
        res.status(200).json(reviews);
    } catch (err) {
        console.error("Error retrieving reviews:", err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addReview, getReviews };
