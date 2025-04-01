import Blog from "../schema/schema";
import connectDB from "../config/mongoose";
import fs from 'fs';
import path from "path";


const filePath = path.join(__dirname, 'data', 'db.json');
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const posts = jsonData.posts;

await connectDB();
const insertBlogs = async () => {
    try {
        const blogs = Blog.insertMany(posts);
        return blogs;
    } catch (error) {
        console.log("Error inserting posts", error)
        throw new Error(error)
    }
}

