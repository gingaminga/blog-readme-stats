import { checkServerInfoController } from "@controllers/info/check-info.controller";
import { checkInfoValidator } from "@validators/info/check-info.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/", checkInfoValidator, checkServerInfoController);

export default router;
