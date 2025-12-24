import { pool } from "../../config/db";

// Function to auto-return expired bookings
const autoReturnExpiredBookings = async () => {

    try {

        // Get all active bookings where rent_end_date has passed
        const expiredBookings = await pool.query(
            `SELECT id, vehicle_id FROM bookings 
             WHERE status = 'active' 
             AND rent_end_date < CURRENT_DATE`
        );

        if (expiredBookings.rows.length > 0) {
            // Update all expired bookings to 'returned'
            await pool.query(
                `UPDATE bookings 
                 SET status = 'returned' 
                 WHERE status = 'active' 
                 AND rent_end_date < CURRENT_DATE`
            );

            // Get unique vehicle IDs from expired bookings
            const vehicleIds = expiredBookings.rows.map(booking => booking.vehicle_id);

            // Update vehicle availability status to 'available'
            await pool.query(
                `UPDATE vehicles 
                 SET availability_status = 'available' 
                 WHERE id = ANY($1::int[])`,
                [vehicleIds]
            );
            return {
                success: true,
                count: expiredBookings.rows.length,
                message: `Auto-returned ${expiredBookings.rows.length} expired bookings`
            };
        }
        return {
            success: true,
            count: 0,
            message: 'No expired bookings to auto-return'
        };

    } catch (error) {
        throw error;
    }
}

export const autoReturnServices = {
    autoReturnExpiredBookings
};