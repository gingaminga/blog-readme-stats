import { getRecentBlogCardController } from "@controllers/blog/get-recent-blog-card.controller";
import { getRecentBlogCardValidator } from "@validators/blog/get-recent-blog-card.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/card", getRecentBlogCardValidator, getRecentBlogCardController);

export default router;
