"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const user_routes_1 = require("./modules/user/user.routes");
const vehicle_routes_1 = require("./modules/vehicle/vehicle.routes");
const booking_routes_1 = require("./modules/booking/booking.routes");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
// initialize DB
(0, db_1.default)();
// apis
app.get('/', (req, res) => {
    res.send('Rent your desire vehicle');
});
app.use('/api/v1/auth', auth_routes_1.authRoutes);
app.use("/api/v1/vehicles", vehicle_routes_1.vehicleRoutes);
app.use("/api/v1/users", user_routes_1.userRoutes);
app.use("/api/v1/bookings", booking_routes_1.bookingRoutes);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
        errors: "API endpoint not found"
    });
});
exports.default = app;
