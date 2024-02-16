const express = require("express");
const router = express.Router();

// import movies_controller
const moviesController = require("../controllers/movies_controller")

// fetch movie genre
router.get("/get/distinct/genres", moviesController.fetchGenres);

// find movies list
router.get("/get/details", moviesController.fetchMovieDetail);

router.get("/getMovieDetailsByGenre/:genre", moviesController.fetchMovieDetailByGenre);


// PUT route to update the 'fav' field of a movie
router.put('/updateFav', moviesController.updateFav);



// Route to fetch movie details by ID
router.get("/getMovieDetailsById/:id", moviesController.fetchMovieDetailsById);



router.delete("/deleteMovieById/:id", moviesController.deleteMovieById);




module.exports = router;

