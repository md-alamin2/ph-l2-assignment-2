"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const db_1 = require("../../config/db");
const getAllUsers = async () => {
    const result = await db_1.pool.query(`SELECT id, name, email, phone, role FROM users`);
    return result;
};
const updateUser = async (id, payload, currentUser) => {
    const { name, email, phone, role } = payload;
    if (currentUser.role !== 'admin' && currentUser.id !== parseInt(id)) {
        throw new Error("You are not allowed to update this user");
    }
    if (currentUser.role !== 'admin') {
        delete payload.role;
    }
    const result = await db_1.pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id = $5 RETURNING id, name, email, phone, role`, [name, email, phone, role, id]);
    return result;
};
const deleteUser = async (id) => {
    // Check if user has active bookings
    const activeBookingsCheck = await db_1.pool.query(`SELECT id FROM bookings WHERE customer_id = $1 AND status = 'active'`, [id]);
    if (activeBookingsCheck.rows.length > 0) {
        throw new Error('Cannot delete user with active bookings');
    }
    const result = await db_1.pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return result;
};
exports.userServices = {
    getAllUsers,
    deleteUser,
    updateUser
};
