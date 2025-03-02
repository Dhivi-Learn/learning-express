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
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})


//middleware
const app = express();
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(limiter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
const {combine, timestamp, json} = winston.format;


const logger = winston.createLogger({
    level: 'info',
    messageFormat: '{timestamp} {level}: {message}',
    timestamp: () => new Date().toLocaleDateString(),
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new winston.transports.Console({}),
        new winston.transports.File({filename: 'app.log'})  // For file output
    ]
})

app.get("/", async (req, res) => {
    logger.info("Request received at /")
    res.statusCode = 200;
    res.send("Hello Express | Node!")
})

app.use("/api/auth", authRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/users", userRouter);

mongoose.connection.on("error", (err) => {
    console.error(err);
})

const connectDataBase = async () => {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected");
}

//connect server
const server = app.listen(PORT, async () => {
    await connectDataBase();
    console.log("Server running on port: " + PORT);
});


const shutdown = async () => {
    server.close(() => {
        logger.info("Server stopped");
    });
    await mongoose.connection.close(false);
    console.log("Server stopped and MongoDB connection closed");
    process.exit(0);
}

// Handle termination signals
process.on("SIGINT", shutdown);  // Ctrl+C
process.on("SIGTERM", shutdown); // Docker/Cloud shutdown signal


export default app;