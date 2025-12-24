"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const verifyRole = (...role) => {
    return async (req, res, next) => {
        try {
            const tokenWithBearer = req.headers.authorization;
            const token = tokenWithBearer?.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    message: 'Unauthorized access',
                    success: false
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
            req.user = decoded;
            if (role.length && !role.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "forbidden access"
                });
            }
            next();
        }
        catch (err) {
            res.status(401).json({
                success: false,
                message: err.message
            });
        }
    };
};
exports.default = verifyRole;
