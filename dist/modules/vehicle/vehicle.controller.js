"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleControllers = void 0;
const vehicle_service_1 = require("./vehicle.service");
const addVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.addVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message
        });
    }
};
const getAllVehicles = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.getAllVehicles();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message
        });
    }
};
const getSingleVehicles = async (req, res) => {
    const { vehicleId } = req.params;
    try {
        const result = await vehicle_service_1.vehicleServices.getSingleVehicles(vehicleId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                errors: "Vehicle not found"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0]
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message
        });
    }
};
const updateVehicle = async (req, res) => {
    const { vehicleId } = req.params;
    try {
        const result = await vehicle_service_1.vehicleServices.updateVehicle(vehicleId, req.body);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                errors: "Vehicle not found"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0]
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message
        });
    }
};
const deleteUser = async (req, res) => {
    const id = req.params.vehicleId;
    try {
        const result = await vehicle_service_1.vehicleServices.deleteVehicle(id);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'Vehicle not found',
                errors: 'Vehicle not found'
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            });
        }
    }
    catch (err) {
        if (err.message.includes('active bookings')) {
            res.status(409).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        }
    }
};
exports.vehicleControllers = {
    addVehicle,
    getAllVehicles,
    getSingleVehicles,
    updateVehicle,
    deleteUser
};
