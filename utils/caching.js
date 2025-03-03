export const setCacheKey = (key) => {
    return (req, res, next) => {
        req.cacheKey = key; // Set cache key for this route
        next(); // Move to next middleware
    };
};