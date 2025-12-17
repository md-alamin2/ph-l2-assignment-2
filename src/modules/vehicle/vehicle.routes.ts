import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = Router();

// vehicle routes

router.post("/", vehicleControllers.addVehicle);

router.get("/", vehicleControllers.getAllVehicles)


export const vehicleRoutes = router;