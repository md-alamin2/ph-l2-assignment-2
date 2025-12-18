import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = Router();

// vehicle routes

router.post("/", vehicleControllers.addVehicle);

router.get("/", vehicleControllers.getAllVehicles);

router.get("/:vehicleId", vehicleControllers.getSingleVehicles);

router.put("/:vehicleId", vehicleControllers.updateVehicle);

router.delete("/:vehicleId", vehicleControllers.deleteUser);


export const vehicleRoutes = router;