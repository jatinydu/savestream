import express from "express";
import { Post } from "../controllers";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/", auth, Post.createPost);
router.get("/", auth, Post.getPosts);
router.patch("/:id", auth, Post.deletePost);
router.patch("/star/:id", auth, Post.addToStar);

export default router;