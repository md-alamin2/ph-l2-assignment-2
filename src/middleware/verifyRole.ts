import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../config";

const verifyRole = (...role: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const tokenWithBearer = req.headers.authorization;
            const token = tokenWithBearer?.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    message: 'Unauthorized access',
                    success: false
                })
            }

            const decoded = jwt.verify(token, config.jwt_secret as string)as JwtPayload;

            req.user = decoded;


            if(role.length && !role.includes(decoded.role)){
                return res.status(403 ).json({
                    success: false,
                    message: "forbidden access"
                })
            }
            next()
        } catch (err: any) {
            res.status(401).json({
                success: false,
                message: err.message
            })
        }
    }
}


export default verifyRole;