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
            message: err.message
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
                message: 'User not found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



export const userControllers = {
    getAllUsers,
    deleteUser
}