import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = Router();

// vehicle routes

router.post("/", vehicleControllers.addVehicle);


export const vehicleRoutes = router;