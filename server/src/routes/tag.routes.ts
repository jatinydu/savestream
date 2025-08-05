import express from "express";
import { Tag } from "../controllers";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/", auth, Tag.createTag);
router.get("/", auth, Tag.getTags);
router.get("/query", auth, Tag.queryTags);

export default router;
