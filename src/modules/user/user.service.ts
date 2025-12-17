import { Request, Response } from "express";
import { pool } from "../../config/db";

const getAllUsers = async()=>{
    const result = await pool.query(`SELECT id, name, email, phone, role FROM users`);

    return result;
}


// const updateUser = async(id:string)=>{
//     const result = await pool.query(``)
// }


const deleteUser = async(id:string)=>{
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

    return result;
}


export const userServices = {
    getAllUsers,
    deleteUser
}