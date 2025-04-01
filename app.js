import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/mongoose.js';
import router from './routes/post.route.js';
import dotenv from 'dotenv';

dotenv.config();
await connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use(router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});