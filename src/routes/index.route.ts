import blogRoutes from "@routes/blog.route";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.use("/blog", blogRoutes);

export default router;
