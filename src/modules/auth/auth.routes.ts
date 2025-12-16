import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

// auth routes
router.post("/signup", authControllers.createUser);

router.post("/signin", authControllers.loginUser);


export const authRoutes = router;