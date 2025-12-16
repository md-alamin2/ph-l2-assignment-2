import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { pool } from "../../config/db";
import config from "../../config";
import jwt from "jsonwebtoken"

const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`, [name, email, hashedPassword, phone, role]);

    return result;
}


const loginUser = async(email: string, password: string)=>{
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])

    if(result.rows.length===0){
        return null
    }

    const user = result.rows[0];

    const matched = await bcrypt.compare(password, user.password);

    if(!matched){
        return null
    }

    const secret = config.jwt_secret as string;

    const token = jwt.sign({name:user.name, email: user.email, role: user.role}, secret, {
        expiresIn: "7d"
    })

    const {password: pass, ...userWithoutPass} = user

    return {token, user: userWithoutPass}
}


export const authServices = {
    createUser,
    loginUser
}