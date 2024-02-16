const express = require("express")
const mongoose = require("mongoose");

// Import the Movie model
const Movie = require("../models/movies_model");

// Create a function to fetch genres
exports.fetchGenres = async (req,res) => {
    try {
        // Use the Movie model
        const genres = await Movie.distinct("genre").exec();
        genres.unshift("all")
        res.send(genres);
    } catch (error) {
        console.error(`Error: ${error}`);               
        throw error;
    }
};

// create a function to fetch movieslist availale on mongodb

exports.fetchMovieDetail = async (req,res) => {
    try {
        const movieDetail = await Movie.find()
        res.send(movieDetail)
    } catch (error) {
        console.error(`Error: ${error}`);
        throw error;
    }
}

exports.fetchMovieDetailByGenre = async (req, res) => {
    try {
        const selectedGenre = req.params.genre; // Use req.params.genre to get the genre from the URL
        const movieDetails = await Movie.find({ genre: selectedGenre }); // Fetch movies with the selected genre
        res.send(movieDetails); // Send the filtered movie details to the client
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' }); // Handle errors properly
    }
}



// Update the favorite status of a movie
exports.updateFav = async (req, res) => {
    try {
        const { _id, fav } = req.body;

        // Find the movie document by ID and update the 'fav' field
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id }, // Query
            { $set: { fav } }, // Update
            { new: true } // Options: return the updated document
        );

        if (updatedMovie) {
            res.json({ message: 'Favorite status updated successfully', movie: updatedMovie });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error updating favorite status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Create a function to fetch movie details by ID
exports.fetchMovieDetailsById = async (req, res) => {
    try {
        const movieId = req.params.id; // Get the movie ID from the request parameters
        const movieDetails = await Movie.findById(movieId); // Fetch movie details by ID
        res.send(movieDetails);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a movie by ID
exports.deleteMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};