import { getPickBlogCardController } from "@controllers/blog/get-pick-blog-card.controller";
import { getRecentBlogCardController } from "@controllers/blog/get-recent-blog-card.controller";
import { getRecentBlogUrlController } from "@controllers/blog/get-recent-blog-url.controller";
import { getPickBlogCardValidator } from "@validators/blog/get-pick-blog-card.validator";
import { getRecentBlogCardValidator } from "@validators/blog/get-recent-blog-card.validator";
import { getRecentBlogUrlValidator } from "@validators/blog/get-recent-blog-url.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/card", getRecentBlogCardValidator, getRecentBlogCardController);
router.get("/card/pick", getPickBlogCardValidator, getPickBlogCardController);
router.get("/redirect", getRecentBlogUrlValidator, getRecentBlogUrlController);

export default router;
