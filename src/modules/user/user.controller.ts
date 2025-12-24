import { Request, Response } from "express";
import { userServices } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsers();


        res.status(200).json({

            success: true,
            message: "Users retrieved successfully",
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

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id, role } = req.user as { id: number, role: string };
        const result = await userServices.updateUser(req.params.userId as string, req.body, { id, role });

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0],
        });


    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message
        })
    }
}


const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.userId;
    try {
        const result = await userServices.deleteUser(id as string);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                errors: 'User not found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
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
}



export const userControllers = {
    getAllUsers,
    deleteUser,
    updateUser
}