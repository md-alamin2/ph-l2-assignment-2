import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const addVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.addVehicle(req.body)

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message
        })
    }
}


const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getAllVehicles();


        res.status(200).json({

            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows

        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message
        })
    }
}

const getSingleVehicles = async (req: Request, res: Response) => {
    const { vehicleId } = req.params;
    try {
        const result = await vehicleServices.getSingleVehicles(vehicleId as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                errors: "Vehicle not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message
        })
    }
}

const updateVehicle = async(req: Request, res: Response)=>{
    const {vehicleId}= req.params;
    try {
        const result = await vehicleServices.updateVehicle(vehicleId as string, req.body);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                errors: "Vehicle not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message
        })
    }
};


const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.vehicleId;
    try {
        const result = await vehicleServices.deleteVehicle(id as string);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'Vehicle not found',
                errors: 'Vehicle not found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            })
        }

    } catch (err: any) {
        if (err.message.includes('active bookings')) {
            res.status(409).json({
                success: false,
                message: err.message,
                errors: err.message
            })
        } else {
            res.status(500).json({
                success: false,
                message: err.message,
                errors: err.message
            })
        }
    }
};


export const vehicleControllers = {
    addVehicle,
    getAllVehicles,
    getSingleVehicles,
    updateVehicle,
    deleteUser
}