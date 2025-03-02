import {JWT_SECRET} from "../config/env.config.js";
import jwt from "jsonwebtoken";

export const authorize = async(req,res,next)=>{

    try{
    const token = req.header('Authorization')?.replace('Bearer','');

    if(!token){
        return res.status(401).json({error: 'Access denied, no token provided'});
    }

    req.user = await jwt.verify(token, JWT_SECRET, {algorithms: ['HS256']});
    next();

    }catch (e) {
        // Handle errors such as invalid or expired token
        return res.status(403).json({ error: `Access denied, invalid token: ${e.message}` });
    }
}