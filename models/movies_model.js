// models/movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    casts: [{
        type: String,
        required: true
    }],
    genre: [{
        type: String,
        required: true
    }],
    image: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    fav:{
        type :Boolean
    }
});


const Movie = mongoose.model("Movie", movieSchema, "movies_list");


module.exports = Movie;
