//middleware to cḥeck cache
import redisClient from "../config/redis.js";

const checkCache = async (req, res, next) => {
    const cacheKey = req.cacheKey;

    if (!cacheKey) next();

    try {
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            console.log("✅ Cache Hit:", cacheKey);
            return res.json({source: "cache", data: JSON.parse(cachedData)});
        }

        console.log("❌ Cache Miss:", cacheKey);
        next(); // Cache miss, proceed to DB query

    }catch (err) {
        console.error("Error checking cache:", err);
        return res.status(500).json({error: "Failed to check cache"});
    }
}

export default checkCache