import Blog from "../schema/schema.js";
import { createClient } from "redis";

// Create a Redis client
const redisClient = createClient();
redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});
await redisClient.connect();

// Get all posts
export const getPosts = async (req, res) => {
    const { page = 1, limit = 10, search, category } = req.query;
    const cacheKey = `posts:page=${page}:limit=${limit}:search=${search || ''}:category=${category || ''}`;

    try {
        // Check if data exists in Redis cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            const { paginatedPosts, total } = JSON.parse(cachedData);
            return res.status(200).json({
                posts: paginatedPosts,
                total,
                message: "Blog posts retrieved successfully (from cache)",
                page: parseInt(page),
                limit: parseInt(limit),
            });
        }

        // Build the query object
        const query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } }, // Case-insensitive search in title
                { content: { $regex: search, $options: "i" } }, // Case-insensitive search in content
                { author: { $regex: search, $options: "i" } }, // Case-insensitive search in author
                { categories: { $regex: search, $options: "i" } }, // Case-insensitive search in categories
            ];
        }
        if (category) {
            query.categories = { $in: [category] }; // Match posts with the specified category
        }

        // Fetch posts from the database
        const posts = await Blog.find(query);
        const startIndex = (page - 1) * limit;
        const paginatedPosts = posts.slice(startIndex, startIndex + parseInt(limit));

        // Include total posts in the cache
        const postsToCache = {
            paginatedPosts,
            total: posts.length,
        };

        // Cache the filtered data
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(postsToCache));

        return res.status(200).json({
            posts: paginatedPosts,
            total: posts.length,
            message: "Blog posts retrieved successfully",
            page: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get a specific post 
export const getPost = async (req, res) => {
    const { _id } = req.params;

    const cacheKey = `post:${_id}`
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.status(200).json({
                post: JSON.parse(cachedData),
                message: `Blog with ${_id} retrieved successfully (from cache)`,
            });
        }
        const post = await Blog.findById(_id).lean();
         // Cache the specific post
         await redisClient.setEx(cacheKey, 3600, JSON.stringify(post));
        
        return res.status(200).json({ post, message: `Blog with ${_id} retrieved successfully` })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Create a new post
export const createPost = async (req, res) => {
    const { title, content, author, categories } = req.body;

    try {
        const newPost = new Blog({ title, content, author, categories });
        const savedPost = await newPost.save();

        // Clear cache for posts
        await redisClient.flushAll();

        console.log(savedPost)

        return res.status(201).json({
            post: savedPost,
            message: "New post created successfully",
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// // Edit a post by ID
// export const editPost = async (req, res) => {
//     const { id } = req.params;
//     const { title, content, author, categories } = req.body;

//     try {
//         const updatedPost = await Blog.findByIdAndUpdate(
//             id,
//             { title, content, author, categories },
//             { new: true }
//         );

//         if (!updatedPost) {
//             return res.status(404).json({ error: "Post not found" });
//         }

//         // Clear cache for posts
//         await redisClient.flushAll();

//         return res.status(200).json({
//             post: updatedPost,
//             message: "Post updated successfully",
//         });
//     } catch (error) {
//         console.error("Error updating post:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };

// // Delete a post by ID
// export const deletePost = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedPost = await Blog.findByIdAndDelete(id);

//         if (!deletedPost) {
//             return res.status(404).json({ error: "Post not found" });
//         }

//         // Clear cache for posts
//         await redisClient.flushAll();

//         return res.status(200).json({
//             post: deletedPost,
//             message: "Post deleted successfully",
//         });
//     } catch (error) {
//         console.error("Error deleting post:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };
