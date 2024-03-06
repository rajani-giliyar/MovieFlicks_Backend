const express = require("express")
const mongoose = require("mongoose");


const Movie = require("../models/movies_model");


exports.fetchGenres = async (req,res) => {
    try {
        
        const genres = await Movie.distinct("genre").exec();
        genres.unshift("all")
        res.send(genres);
    } catch (error) {
        console.error(`Error: ${error}`);               
        throw error;
    }
};



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
        const selectedGenre = req.params.genre; 
        const movieDetails = await Movie.find({ genre: selectedGenre }); 
        res.send(movieDetails); 
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' }); 
    }
}




exports.updateFav = async (req, res) => {
    try {
        const { _id, fav } = req.body;

        
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id }, 
            { $set: { fav } }, 
            { new: true } 
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



exports.fetchMovieDetailsById = async (req, res) => {
    try {
        const movieId = req.params.id; 
        const movieDetails = await Movie.findById(movieId); 
        res.send(movieDetails);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};


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