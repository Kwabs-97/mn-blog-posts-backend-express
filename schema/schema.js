import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function
const { Schema } = mongoose;

const BpmSchema = new Schema({
    _id: false,
    id: {
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4() // Generate a new UUID for each document
    },
    title: {
        required: true,
        type: String,
        min: [5, 'Title should have at least 5 characters']
    },
    content: {
        required: true,
        type: String,
        min: [50, 'Content should have at least 50 characters']
    },
    author: {
        required: true,
        type: String,
        min: [5, "Author should have at least 5 characters"]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    categories: {
        required: true,
        type: [String],
        min: [1, "Select at least one category"]
    }
});

const { model } = mongoose;
const Blog = model('Blogs', BpmSchema);
export default Blog;