import User from "../models/user.model.js";
import {hashPassword} from "../utils/bcrypt.js";
// import redisClient from "../config/redis.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({},{password:0}).limit(100).lean().exec();
        // Store data in Redis Cache (Expire in 1 hour)
        //await redisClient.setEx(req.cacheKey, 3600, JSON.stringify(users));

        res.status(200).json({
            message: "Users retrieved successfully",
            users
        }).end();
    } catch (err) {
        res.status(500).json({message: "Error in getting user"}).end();
    }
}

export const createNewUser = async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.email});
        if(user) return res.status(409).json({message: "User with this email already exists"}).end();

        req.body.password = await hashPassword(req.body.password);
        const newUser = await User.create(req.body);

        // await redisClient.setEx(req.cacheKey, 3600, JSON.stringify(newUser));

        res.status(201).json({
            message: "User created successfully",
            user:newUser
        }).end();
    } catch (err) {
        res.status(500).json({message: "Error in creating user"}).end();
    }
}