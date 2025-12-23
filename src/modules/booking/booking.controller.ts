import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingServices.createBooking(req.body);

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result.rows[0]
        });

    } catch (err: any) {
        if (err.message.includes('not found') || err.message.includes('Invalid')) {
            res.status(404).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        } else if (err.message.includes('not available') || err.message.includes('past') || err.message.includes('after')) {
            res.status(400).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                errors: err.message
            });
        }
    }
};

const getAllBookings = async (req: Request, res: Response) => {
    try {
        const userRole = req.user?.role;
        const userId = req.user?.id;

        const result = await bookingServices.getAllBookings(userRole, userId);

        const message = userRole === 'admin' 
            ? 'Bookings retrieved successfully' 
            : 'Your bookings retrieved successfully';

        res.status(200).json({
            success: true,
            message: message,
            data: result.rows
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const updateBooking = async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const { status } = req.body;
    const userRole = (req as any).user.role;
    const userId = (req as any).user.id;

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

        const result = await bookingServices.updateBooking(
            bookingId as string, 
            status, 
            userRole, 
            userId
        );

        const message = status === 'cancelled' 
            ? 'Booking cancelled successfully'
            : 'Booking marked as returned. Vehicle is now available';

        res.status(200).json({
            success: true,
            message: message,
            data: result.rows[0]
        });

    } catch (err: any) {
        if (err.message.includes('not found')) {
            res.status(404).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        } else if (err.message.includes('Access denied') || err.message.includes('can only')) {
            res.status(403).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        } else if (err.message.includes('Cannot') || err.message.includes('already')) {
            res.status(400).json({
                success: false,
                message: err.message,
                errors: err.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                errors: err.message
            });
        }
    }
};

const deleteBooking = async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    
    try {
        const result = await bookingServices.deleteBooking(bookingId as string);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'Booking not found',
                errors: 'Invalid booking ID'
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Booking deleted successfully",
                data: null
            });
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errors: err.message
        });
    }
};

export const bookingControllers = {
    createBooking,
    getAllBookings,
    updateBooking,
    deleteBooking
};