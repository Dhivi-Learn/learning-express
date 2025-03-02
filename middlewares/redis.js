// import Redis from 'ioredis';
//
// // Create and export Redis client
// export const redisClient = new Redis({
//     host: 'localhost',
//     port: 6379,
//     reconnectOnError: (err) => {
//         // Automatically reconnect on errors
//         console.log('Reconnecting to Redis due to error:', err);
//         return true;
//     },
// });
//
// redisClient.on('connect', () => {
//     console.log('Connected to Redis');
// });
//
// redisClient.on('error', (err) => {
//     console.error('Redis error:', err);
// });
//
// export default redisClient