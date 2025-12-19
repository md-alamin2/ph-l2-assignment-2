import { Router } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/verifyCustomer";

const router = Router();

// user routes
router.get("/", auth('Admin'), userControllers.getAllUsers);

router.delete("/:userId", auth('Admin'), userControllers.deleteUser)

export const userRoutes = router;