import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = Router();

// vehicle routes

router.post("/", vehicleControllers.addVehicle);

router.get("/", vehicleControllers.getAllVehicles);

router.get("/:vehicleId", vehicleControllers.getSingleVehicles)


export const vehicleRoutes = router;