const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    theaterId: Number,
    location: {
        address: {
            street1: String,
            city: String,
            state: String,
            zipcode: String
        },
        geo: {
            type: { type: String, enum: ['Point'], default: 'Point' },
            coordinates: [Number]
        }
    }
});

theaterSchema.index({ 'location.geo': '2dsphere' });

module.exports = mongoose.model('Theater', theaterSchema);