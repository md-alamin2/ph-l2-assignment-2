import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/verifyCustomer";

const router = Router();

// vehicle routes

router.post("/", auth('Admin'), vehicleControllers.addVehicle);

router.get("/", vehicleControllers.getAllVehicles);

router.get("/:vehicleId", vehicleControllers.getSingleVehicles);

router.put("/:vehicleId", auth('Admin'), vehicleControllers.updateVehicle);

router.delete("/:vehicleId", auth('Admin'), vehicleControllers.deleteUser);


export const vehicleRoutes = router;