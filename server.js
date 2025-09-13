const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4320;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
