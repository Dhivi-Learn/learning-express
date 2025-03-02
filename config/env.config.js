import {configDotenv} from "dotenv";

configDotenv()

export const {PORT, NODE_ENV,MONGODB_URI,NODEMAILER_PASSWORD,JWT_SECRET} = process.env;