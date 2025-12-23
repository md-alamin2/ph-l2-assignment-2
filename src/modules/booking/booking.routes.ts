import { Router } from "express";
import verifyRole from "../../middleware/verifyRole";
import { bookingControllers } from "./booking.controller";

const router = Router();
// Create booking - Customer or Admin
router.post('/', verifyRole('customer'), bookingControllers.createBooking);

// Get all bookings - Role-based (Admin sees all, Customer sees own)
router.get('/', verifyRole(), bookingControllers.getAllBookings);

// Update booking - Role-based
router.put('/:bookingId', verifyRole(), bookingControllers.updateBooking);

// Delete booking - Admin only (bonus endpoint)
router.delete('/:bookingId', verifyRole(), bookingControllers.deleteBooking);

export const bookingRoutes = router;