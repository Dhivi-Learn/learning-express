import mongoose from "mongoose";
import {MONGODB_URI} from "./env.config.js";

const options = {
    maxPoolSize: 10,
}

const connectDataBase = async () => {
    try {
        await mongoose.connect(MONGODB_URI, options);
        console.log("MongoDB Connected");
    } catch (e) {
        console.error("Error connecting to MongoDB", e);
        process.exit(1);
    }
}

export default connectDataBase;
