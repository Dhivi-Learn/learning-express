import {configDotenv} from "dotenv";

configDotenv()

export const {PORT, NODE_ENV,MONGODB_URI,NODEMAILER_PASSWORD,JWT_SECRET,REDIS_URL,REDIS_PORT} = process.env;