"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const verifyRole_1 = __importDefault(require("../../middleware/verifyRole"));
const router = (0, express_1.Router)();
// user routes
router.get("/", (0, verifyRole_1.default)('admin'), user_controller_1.userControllers.getAllUsers);
router.put("/:userId", (0, verifyRole_1.default)('admin', 'customer'), user_controller_1.userControllers.updateUser);
router.delete("/:userId", (0, verifyRole_1.default)('admin'), user_controller_1.userControllers.deleteUser);
exports.userRoutes = router;
