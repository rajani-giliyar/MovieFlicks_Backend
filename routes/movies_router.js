const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/movies_controller");

router.get("/get/distinct/genres", moviesController.fetchGenres);

router.get("/get/details", moviesController.fetchMovieDetail);

router.get(
  "/getMovieDetailsByGenre/:genre",
  moviesController.fetchMovieDetailByGenre
);

router.put("/updateFav", moviesController.updateFav);

router.get("/getMovieDetailsById/:id", moviesController.fetchMovieDetailsById);

router.delete("/deleteMovieById/:id", moviesController.deleteMovieById);

module.exports = router;
