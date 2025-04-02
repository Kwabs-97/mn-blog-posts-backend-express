import Blog from "../schema/schema.js";
import connectDB from "../config/mongoose.js";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join('__dirname', '../data', 'db.json');
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const posts = jsonData.posts;

await connectDB();

const insertBlogs = async () => {
    try {
        const blogs = await Blog.insertMany(posts);
        return blogs;
    } catch (error) {
        console.log("Error inserting posts", error)
        throw new Error(error)
    }
}

export const allPosts = await insertBlogs();

