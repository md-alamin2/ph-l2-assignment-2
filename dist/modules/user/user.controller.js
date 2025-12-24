"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const getAllUsers = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
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
const updateUser = async (req, res) => {
    try {
        const { id, role } = req.user;
        const result = await user_service_1.userServices.updateUser(req.params.userId, req.body, { id, role });
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0],
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
const deleteUser = async (req, res) => {
    const id = req.params.userId;
    try {
        const result = await user_service_1.userServices.deleteUser(id);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                errors: 'User not found'
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
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
exports.userControllers = {
    getAllUsers,
    deleteUser,
    updateUser
};
