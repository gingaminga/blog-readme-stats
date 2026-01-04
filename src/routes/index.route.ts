import infoRoutes from "@routes/info.route";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.use("/info", infoRoutes);

export default router;
