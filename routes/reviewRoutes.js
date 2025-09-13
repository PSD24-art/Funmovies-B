const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Movie = require("../models/Movie");
const auth = require("../middleware/auth");

// Submit review
router.post("/:movieId", auth, async (req, res) => {
  const { rating, text } = req.body;
  const review = new Review({
    user: req.userId,
    movie: req.params.movieId,
    rating,
    text,
  });
  await review.save();

  // Update movie avgRating
  const reviews = await Review.find({ movie: req.params.movieId });
  const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  await Movie.findByIdAndUpdate(req.params.movieId, { avgRating: avg });

  res.json({ message: "Review submitted" });
});

// Get reviews for a movie
router.get("/:movieId", async (req, res) => {
  const reviews = await Review.find({ movie: req.params.movieId }).populate(
    "user",
    "username"
  );
  res.json(reviews);
});

module.exports = router;
