import { Router } from "express";

import AuthController from "../controller/AuthController";

const router = Router();

router.post("/api/login", AuthController.login);

export { router as AuthRouter };
