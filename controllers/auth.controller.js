import {comparePassword, hashPassword} from "../utils/bcrypt.js";
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../config/env.config.js";
import User from "../models/user.model.js";

export const signIn = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(401).json({error: true, message: 'User not found'})
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await comparePassword(req.body.password, user.password);
    if (!isMatch) {
        return res.status(401).json({error: true, message: 'Invalid credentials'})
    }
    //generate jwt token
    const token = await jwt.sign({userId: user._id, email: user.email}, JWT_SECRET,{
        expiresIn: '1h', // token expires in 1 hour
        algorithm: 'HS256',
    });
    res.status(200).json({error: false, message: 'Logged in successfully', token})
}

export const signUp = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(409).json({error: true, message: 'User already exists'})
    }

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);

    res.status(201).json({error: false, message: 'User created successfully', user: newUser});
}