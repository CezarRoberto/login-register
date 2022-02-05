import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

import UserController from "../controller/UserController";

const  router = Router();

router.get("/api/users", authMiddleware, UserController.getAllUsers);
router.post("/api/register", UserController.createUser)
router.delete("/api/user/:Id", UserController.deleteUser)


export {router as UserRouter};