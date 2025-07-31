const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'sample_mflix',
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};

// Graceful shutdown on process termination
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🛑 MongoDB disconnected on app termination');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await mongoose.connection.close();
    console.log('🛑 MongoDB disconnected on SIGTERM');
    process.exit(0);
});

module.exports = connectDB;