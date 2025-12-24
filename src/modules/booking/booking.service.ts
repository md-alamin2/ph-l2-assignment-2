import { pool } from "../../config/db";
import { PoolClient } from "pg";

interface BookingData {
    customer_id: number;
    vehicle_id: number;
    rent_start_date: string;
    rent_end_date: string;
}

// Helper function to calculate days between dates
const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays; // Minimum 1 day
};

const createBooking = async (payload: Record<string, unknown>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    // Validate required fields
    if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
        throw new Error('All fields are required: customer_id, vehicle_id, rent_start_date, and rent_end_date');
    }

    // Validate dates
    const startDate = new Date(rent_start_date as string);
    const endDate = new Date(rent_end_date as string);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
        throw new Error('Start date cannot be in the past');
    }

    if (endDate <= startDate) {
        throw new Error('End date must be after start date');
    }

    try {

        // Check if customer exists
        const customerCheck = await pool.query(
            'SELECT id FROM users WHERE id = $1 AND role = $2',
            [customer_id, 'customer']
        );

        if (customerCheck.rows.length === 0) {
            throw new Error('Customer not found');
        }

        // Check if vehicle exists and is available
        const vehicleCheck = await pool.query(
            'SELECT id, vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id = $1',
            [vehicle_id]
        );

        if (vehicleCheck.rows.length === 0) {
            throw new Error('Vehicle not found');
        }

        const vehicle = vehicleCheck.rows[0];

        if (vehicle.availability_status !== 'available') {
            throw new Error(`Vehicle is not available. Current status: ${vehicle.availability_status}`);
        }

        // Calculate total price
        const numberOfDays = calculateDays(rent_start_date as string, rent_end_date as string);
        const totalPrice = vehicle.daily_rent_price * numberOfDays;

        // Create booking
        const result = await pool.query(
            `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status`,
            [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice, 'active']
        );

        // Update vehicle status to booked
        await pool.query(
            'UPDATE vehicles SET availability_status = $1 WHERE id = $2',
            ['booked', vehicle_id]
        );


        // Add vehicle info to response
        result.rows[0].vehicle = {
            vehicle_name: vehicle.vehicle_name,
            daily_rent_price: vehicle.daily_rent_price
        };

        return result;

    } catch (error) {
        throw error;
    }
};

const getAllBookings = async (userRole: string, userId: number) => {
    let query: string;
    let params: any[] = [];

    if (userRole === 'admin') {
        // Admin sees all bookings with customer and vehicle details
        query = `
            SELECT 
                b.id,
                b.customer_id,
                b.vehicle_id,
                b.rent_start_date,
                b.rent_end_date,
                b.total_price,
                b.status,
                json_build_object(
                    'name', u.name,
                    'email', u.email
                ) as customer,
                json_build_object(
                    'vehicle_name', v.vehicle_name,
                    'registration_number', v.registration_number
                ) as vehicle
            FROM bookings b
            JOIN users u ON b.customer_id = u.id
            JOIN vehicles v ON b.vehicle_id = v.id
            ORDER BY b.id DESC
        `;
    } else {
        // Customer sees only their own bookings
        query = `
            SELECT 
                b.id,
                b.vehicle_id,
                b.rent_start_date,
                b.rent_end_date,
                b.total_price,
                b.status,
                json_build_object(
                    'vehicle_name', v.vehicle_name,
                    'registration_number', v.registration_number,
                    'type', v.type
                ) as vehicle
            FROM bookings b
            JOIN vehicles v ON b.vehicle_id = v.id
            WHERE b.customer_id = $1
            ORDER BY b.id DESC
        `;
        params = [userId];
    }

    const result = await pool.query(query, params);
    return result;
};

const updateBooking = async (
    bookingId: string,
    status: string,
    userRole: string,
    userId: number
) => {
    // Check if booking exists
    const bookingCheck = await pool.query(
        'SELECT * FROM bookings WHERE id = $1',
        [bookingId]
    );

    if (bookingCheck.rows.length === 0) {
        throw new Error('Booking not found');
    }

    const booking = bookingCheck.rows[0];

    // Role-based authorization
    if (userRole === 'customer') {
        // Customer can only cancel their own bookings
        if (booking.customer_id !== userId) {
            throw new Error('Access denied: You can only manage your own bookings');
        }

        if (status !== 'cancelled') {
            throw new Error('Access denied: Customers can only cancel bookings');
        }

        // Can't cancel if already cancelled or returned
        if (booking.status === 'cancelled' || booking.status === 'returned') {
            throw new Error(`Cannot cancel booking: Booking is already ${booking.status}`);
        }

        // Customer can only cancel before rent start date
        const rentStartDate = new Date(booking.rent_start_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        rentStartDate.setHours(0, 0, 0, 0);

        if (today >= rentStartDate) {
            throw new Error('Cannot cancel booking: You can only cancel before the rent start date');
        }
    } else if (userRole === 'admin') {
        // Admin can mark as returned
        if (status === 'returned' && booking.status !== 'active') {
            throw new Error('Cannot mark as returned: Only active bookings can be marked as returned');
        }
    }


    try {
        // Update booking status
        await pool.query(
            'UPDATE bookings SET status = $1 WHERE id = $2',
            [status, bookingId]
        );
        // Update vehicle availability if cancelled or returned
        if (status === 'cancelled' || status === 'returned') {
            await pool.query(
                'UPDATE vehicles SET availability_status = $1 WHERE id = $2',
                ['available', booking.vehicle_id]
            );
        }

        // Get updated booking with vehicle info
        let result;
        if (status === 'returned') {
            result = await pool.query(
                `SELECT 
                    b.id,
                    b.customer_id,
                    b.vehicle_id,
                    b.rent_start_date,
                    b.rent_end_date,
                    b.total_price,
                    b.status,
                    json_build_object(
                        'availability_status', v.availability_status
                    ) as vehicle
                FROM bookings b
                JOIN vehicles v ON b.vehicle_id = v.id
                WHERE b.id = $1`,
                [bookingId]
            );
        } else {
            result = await pool.query(
                `SELECT 
                    id,
                    customer_id,
                    vehicle_id,
                    rent_start_date,
                    rent_end_date,
                    total_price,
                    status
                FROM bookings
                WHERE id = $1`,
                [bookingId]
            );
        }

        return result;

    } catch (error) {
        throw error;
    }
};

export const bookingServices = {
    createBooking,
    getAllBookings,
    updateBooking,
};