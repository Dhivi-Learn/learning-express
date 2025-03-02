import User from "../models/user.model.js";
import {hashPassword} from "../utils/bcrypt.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({},{email:0}).limit(100).lean().exec();

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
        const user = User.findOne({email : req.body.email});
        if(user) return res.status(409).json({message: "User with this email already exists"}).end();

        req.body.password = await hashPassword(req.body.password);
        const newUser = await User.create(req.body)
        res.status(201).json({
            message: "User created successfully",
            user:newUser
        }).end();
    } catch (err) {
        res.status(500).json({message: "Error in creating user"}).end();
    }
}