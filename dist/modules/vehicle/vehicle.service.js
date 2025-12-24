"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleServices = void 0;
const db_1 = require("../../config/db");
const addVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await db_1.pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result;
};
const getAllVehicles = async () => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles`);
    return result;
};
const getSingleVehicles = async (vehicleId) => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles WHERE id = $1 `, [vehicleId]);
    return result;
};
const updateVehicle = async (id, payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await db_1.pool.query(`UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]);
    return result;
};
const deleteVehicle = async (id) => {
    // Check if vehicle has active bookings
    const activeBookingsCheck = await db_1.pool.query(`SELECT id FROM bookings WHERE vehicle_id = $1 AND status = 'active'`, [id]);
    if (activeBookingsCheck.rows.length > 0) {
        throw new Error('Cannot delete vehicle with active bookings');
    }
    const result = await db_1.pool.query(`DELETE FROM vehicles WHERE id =$1`, [id]);
    return result;
};
exports.vehicleServices = {
    addVehicle,
    getAllVehicles,
    getSingleVehicles,
    updateVehicle,
    deleteVehicle
};
