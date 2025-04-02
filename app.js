import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/mongoose.js';
import router from './routes/post.route.js';
import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config();
await connectDB();

try {
  // Use environment variables for Redis connection
  const redisClient = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
    },
  });

  redisClient.on('connect', () => {
    console.log('Successfully connected to Redis!');
  });

  redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
  });

  await redisClient.connect();

  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Routes
  app.use(router);

  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error('Exception during Redis client setup:', error);
}