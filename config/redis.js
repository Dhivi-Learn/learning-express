import redis, {createClient} from "redis";
import {REDIS_PORT, REDIS_URL} from "./env.config.js"
import {configDotenv} from "dotenv";

configDotenv()

//crete redis client
const redisClient = createClient({
    url: REDIS_URL, // Use a secure Redis URL
    socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000), // Retry strategy
        keepAlive: 30000, // Keep connection alive
        connectTimeout: 10000, // Timeout if Redis doesn’t respond
    }
});

redisClient.connect()
    .then(() => console.log("✅ Connected to Redis"))
    .catch((err) => console.error("Redis Connection Error:", err));

export default redisClient