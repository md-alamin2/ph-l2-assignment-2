import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import verifyRole from "../../middleware/verifyRole";

const router = Router();

// vehicle routes

router.post("/", verifyRole('admin'), vehicleControllers.addVehicle);

router.get("/", vehicleControllers.getAllVehicles);

router.get("/:vehicleId", vehicleControllers.getSingleVehicles);

router.put("/:vehicleId", verifyRole('admin'), vehicleControllers.updateVehicle);

router.delete("/:vehicleId", verifyRole('admin'), vehicleControllers.deleteUser);


export const vehicleRoutes = router;