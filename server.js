//modules
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import winston from "winston";

import openapiSpecification from "./swagger.js";
import {MONGODB_URI, PORT} from "./config/env.config.js";
//routes
import commentsRouter from "./routes/comments.route.js";
import moviesRouter from "./routes/movies.routes.js";
import userRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";

//middleware
const app = express();
app.use(express.json());
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
const {combine,timestamp,json} = winston.format;


const logger = winston.createLogger({
  level: 'info',
  messageFormat: '{timestamp} {level}: {message}',
  timestamp: () => new Date().toLocaleDateString(),
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new winston.transports.Console({
    }),
    new winston.transports.File({ filename: 'app.log' })  // For file output
  ]
})

app.get("/", async(req, res) => {
  logger.info("Request received at /")
  res.statusCode = 200;
  res.send("Hello Express | Node!")
})

app.use("/auth",authRouter)
app.use("/comments",commentsRouter) // comments
app.use("/movies",moviesRouter)
app.use("/users",userRouter)

mongoose.connection.on("error", (err) => {
  console.error(err);
})

const connectDataBase = async()=>{
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB Connected");
}

//connect server
app.listen(PORT, async()=> {
  await connectDataBase();
  console.log("Server running on port: " + PORT);
});