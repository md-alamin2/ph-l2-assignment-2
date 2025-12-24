"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const auth_service_1 = require("./auth.service");
const createUser = async (req, res) => {
    try {
        const result = await auth_service_1.authServices.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
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
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth_service_1.authServices.loginUser(email, password);
        if (!result) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
                errors: 'Invalid email or password'
            });
        }
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token: result.token,
                user: result.user,
            }
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
exports.authControllers = {
    createUser,
    loginUser
};
