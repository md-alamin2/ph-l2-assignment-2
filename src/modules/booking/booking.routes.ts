import { Router } from "express";
import verifyRole from "../../middleware/verifyRole";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.post('/', verifyRole('customer'), bookingControllers.createBooking);

router.get('/', verifyRole("customer", "admin"), bookingControllers.getAllBookings);

router.put('/:bookingId', verifyRole("customer", "admin"), bookingControllers.updateBooking);

export const bookingRoutes = router;