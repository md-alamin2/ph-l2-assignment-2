"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingControllers = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = async (req, res) => {
    try {
        const result = await booking_service_1.bookingServices.createBooking(req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result.rows[0]
        });
    }
    catch (err) {
        if (err.message.includes('not found') || err.message.includes('Invalid')) {
            res.status(404).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        }
        else if (err.message.includes('not available') || err.message.includes('past') || err.message.includes('after')) {
            res.status(400).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                errors: err.message
            });
        }
    }
};
const getAllBookings = async (req, res) => {
    try {
        const userRole = req.user?.role;
        const userId = req.user?.id;
        const result = await booking_service_1.bookingServices.getAllBookings(userRole, userId);
        const message = userRole === 'admin'
            ? 'Bookings retrieved successfully'
            : 'Your bookings retrieved successfully';
        res.status(200).json({
            success: true,
            message: message,
            data: result.rows
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;
    const userRole = req.user.role;
    const userId = req.user.id;
    try {
        // Validation
        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required',
                errors: 'Please provide a status to update'
            });
        }
        const validStatuses = ['cancelled', 'returned'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status',
                errors: 'Status must be either "cancelled" or "returned"'
            });
        }
        const result = await booking_service_1.bookingServices.updateBooking(bookingId, status, userRole, userId);
        const message = status === 'cancelled'
            ? 'Booking cancelled successfully'
            : 'Booking marked as returned. Vehicle is now available';
        res.status(200).json({
            success: true,
            message: message,
            data: result.rows[0]
        });
    }
    catch (err) {
        if (err.message.includes('not found')) {
            res.status(404).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        }
        else if (err.message.includes('Access denied') || err.message.includes('can only')) {
            res.status(403).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        }
        else if (err.message.includes('Cannot') || err.message.includes('already')) {
            res.status(400).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                errors: err.message
            });
        }
    }
};
exports.bookingControllers = {
    createBooking,
    getAllBookings,
    updateBooking,
};
