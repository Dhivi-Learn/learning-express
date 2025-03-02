//  import redisClient from "../middlewares/redis.js";
//
// //middleware to cḥeck cache
// const checkCache =async(req, res, next)=>{
//     const cacheKey = req.cacheKey ;
//
//     if(!cacheKey) next();
//
//     await redisClient.get(cacheKey,(err,res)=>{
//         if(err) {
//             console.error('Error getting from cache:',err)
//             return res.status(500).json({error: 'Error getting data from cache'})
//         }
//
//         if(res)  return res.json({source:'cache',data: JSON.parse(res)})
//
//         console.log('cache missed');
//         next();
//     });
// }
//
// export default checkCache