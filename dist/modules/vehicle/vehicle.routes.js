"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoutes = void 0;
const express_1 = require("express");
const vehicle_controller_1 = require("./vehicle.controller");
const verifyRole_1 = __importDefault(require("../../middleware/verifyRole"));
const router = (0, express_1.Router)();
// vehicle routes
router.post("/", (0, verifyRole_1.default)('admin'), vehicle_controller_1.vehicleControllers.addVehicle);
router.get("/", vehicle_controller_1.vehicleControllers.getAllVehicles);
router.get("/:vehicleId", vehicle_controller_1.vehicleControllers.getSingleVehicles);
router.put("/:vehicleId", (0, verifyRole_1.default)('admin'), vehicle_controller_1.vehicleControllers.updateVehicle);
router.delete("/:vehicleId", (0, verifyRole_1.default)('admin'), vehicle_controller_1.vehicleControllers.deleteUser);
exports.vehicleRoutes = router;
