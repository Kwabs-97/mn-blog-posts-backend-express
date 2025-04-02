import { Router } from "express";
import { getPosts, getPost, editPost, deletePost, createPost } from "../controllers/blogs.controller.js";


const router = Router();


router.get("/posts", getPosts);

router.post("/new-post", createPost);


router.get("/post/:id", getPost)


router.put("/post/edit/:id", editPost);


router.delete("/post/:id", deletePost);

export default router;