const mongoose = require('mongoose');

const imdbSchema = new mongoose.Schema({
    rating: Number,
    votes: Number,
    id: Number
}, { _id: false });

const tomatoesSchema = new mongoose.Schema({
    viewer: {
        rating: Number,
        numReviews: Number
    },
    lastUpdated: Date
}, { _id: false });

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    runtime: Number,
    released: Date,
    poster: String,
    plot: String,
    fullplot: String,
    lastupdated: String,
    type: String,
    directors: [String],
    cast: [String],
    countries: [String],
    genres: [String],
    imdb: imdbSchema,
    tomatoes: tomatoesSchema,
    num_mflix_comments: Number
});

module.exports = mongoose.model('Movie', movieSchema);