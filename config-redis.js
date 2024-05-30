'use strict';
const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const redisClient = redis.createClient(
    process.env.REDIS_HOST,
    process.env.REDIS_PORT,
)

module.exports = redisClient;
