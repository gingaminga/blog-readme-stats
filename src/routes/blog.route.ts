import { getRecentBlogCardController } from "@controllers/blog/get-recent-blog-card.controller";
import { getRecentBlogUrlController } from "@controllers/blog/get-recent-blog-url.controller";
import { getRecentBlogCardValidator } from "@validators/blog/get-recent-blog-card.validator";
import { getRecentBlogUrlValidator } from "@validators/blog/get-recent-blog-url.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/card", getRecentBlogCardValidator, getRecentBlogCardController);
router.get("/redirect", getRecentBlogUrlValidator, getRecentBlogUrlController);

export default router;
