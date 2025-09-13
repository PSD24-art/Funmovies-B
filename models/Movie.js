const mongoose = require("mongoose");
const data = require("../data/movies.json");

const movieSchema = new mongoose.Schema({
  poster_path: { type: String },
  adult: { type: Boolean, default: false },
  overview: { type: String },
  release_date: { type: String },
  genre_ids: [{ type: Number }], // TMDb genre IDs
  tmdbId: { type: Number, required: true }, // TMDb ID
  original_title: { type: String },
  original_language: String,
  title: { type: String, required: true },
  backdrop_path: { type: String },
  popularity: { type: Number, default: 0 },
  vote_count: { type: Number, default: 0 },
  vote_average: { type: Number, default: 0 },

  video: { type: Boolean, default: false },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
const addMovies = async () => {
  await Movie.deleteMany({});
  let result = await Movie.insertMany(data, { ordered: false });
};

// addMovies();
