import { Router } from "express";
import { userControllers } from "./user.controller";
import verifyRole from "../../middleware/verifyRole";

const router = Router();

// user routes
router.get("/", verifyRole('admin'), userControllers.getAllUsers);

router.put("/:userId", verifyRole('admin', 'customer'), userControllers.updateUser)

router.delete("/:userId", verifyRole('admin'), userControllers.deleteUser)

export const userRoutes = router;