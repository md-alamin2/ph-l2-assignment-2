import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

// user routes
router.get("/", userControllers.getAllUsers)

export const userRoutes = router;