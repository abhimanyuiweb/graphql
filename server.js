const { ApolloServer } = require('apollo-server');
const rateLimit = require('express-rate-limit');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const connectDB = require('./config/db');
connectDB();

process.on('uncaughtException', err => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

// Step 3: Create rate limiters at app startup
const rateLimiters = {
    '192.168.1.100': rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
        message: 'Too many requests from 192.168.1.100',
        standardHeaders: true,
        legacyHeaders: false
    }),
    '10.0.0.5': rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 10,
        message: 'Too many requests from 10.0.0.5',
        standardHeaders: true,
        legacyHeaders: false
    }),
    default: rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 20,
        message: 'Too many requests',
        standardHeaders: true,
        legacyHeaders: false
    })
};

// Step 4: Middleware to apply correct limiter
const applyRateLimiter = (req, res, next) => {
    const ip = req.ip;
    const limiter = rateLimiters[ip] || rateLimiters.default;
    return limiter(req, res, next);
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});