const mongoose = require('mongoose');

const imdbSchema = new mongoose.Schema({
    rating: Number,
    votes: Number,
    id: Number
}, { _id: false });

const tomatoesSchema = new mongoose.Schema({
    viewer: {
        rating: Number,
        numReviews: Number,
        meter: Number
    },
    critic: {
        rating: Number,
        numReviews: Number,
        meter: Number
    },
    dvd: Date,
    lastUpdated: Date,
    production: String,
    rotten: Number,
    fresh: Number,
    boxOffice: String,
    consensus: String
}, { _id: false });

const awardsSchema = new mongoose.Schema({
    wins: Number,
    nominations: Number,
    text: String
}, { _id: false });

const embeddedMovieSchema = new mongoose.Schema({
    plot: String,
    genres: [String],
    runtime: Number,
    rated: String,
    cast: [String],
    num_mflix_comments: Number,
    poster: String,
    title: String,
    lastupdated: String,
    languages: [String],
    directors: [String],
    writers: [String],
    awards: awardsSchema,
    imdb: imdbSchema,
    countries: [String],
    type: String,
    tomatoes: tomatoesSchema,
    plot_embedding: Buffer,
    plot_embedding_voyage_3_large: Buffer
});

module.exports = mongoose.model('EmbeddedMovie', embeddedMovieSchema);