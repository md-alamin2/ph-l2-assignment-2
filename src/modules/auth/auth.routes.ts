import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

// auth routes
router.post("/signup", authControllers.createUser);

// router.post("/login");


export const authRoutes = router;