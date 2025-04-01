import { Router } from "express";
import { getPosts, getPost } from "../controllers/blogs.controller.js";
import { createPost } from "../controllers/blogs.controller.js";

const router = Router();

// Route to get all posts
router.get("/posts", getPosts);

// Route to create a new post
router.post("/new-post", createPost);

// Route to get a single post
router.get("/post/:_id", getPost)

// // Route to edit a post by ID
// router.put("/edit/:id", editPost);

// // Route to delete a post by ID
// router.delete("/:id", deletePost);

export default router;