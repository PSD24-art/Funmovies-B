const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Get single movie
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

module.exports = router;
