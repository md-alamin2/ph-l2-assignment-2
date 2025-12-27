import { pool } from "../../config/db";

const addVehicle = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    return result;
}


const getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);

    return result;
}

const getSingleVehicles = async (vehicleId: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1 `, [vehicleId]);

    return result;
}

const updateVehicle = async (id: string, payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]);

    return result
}

const deleteVehicle = async (id: string) => {
    // Check if vehicle has active bookings
    const activeBookingsCheck = await pool.query(
        `SELECT id FROM bookings WHERE vehicle_id = $1 AND status = 'active'`,
        [id]
    );

    if (activeBookingsCheck.rows.length > 0) {
        throw new Error('Cannot delete vehicle with active bookings');
    }

    const result = await pool.query(`DELETE FROM vehicles WHERE id =$1`, [id]);

    return result;
}


export const vehicleServices = {
    addVehicle,
    getAllVehicles,
    getSingleVehicles,
    updateVehicle,
    deleteVehicle
}