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
            message: err.message
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
            message: err.message
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
                message: "Vehicle not found"
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
            message: err.message
        })
    }
}


export const vehicleControllers = {
    addVehicle,
    getAllVehicles,
    getSingleVehicles
}