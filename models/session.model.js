const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user_id: String,
    jwt: String
});

module.exports = mongoose.model('Session', sessionSchema);