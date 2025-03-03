import redis from "redis";

//crete redis client
const redisClient = redis.createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379
    }
});

redisClient.connect()
    .then(() => console.log("✅ Connected to Redis"))
    .catch((err) => console.error("Redis Connection Error:", err));

export default redisClient