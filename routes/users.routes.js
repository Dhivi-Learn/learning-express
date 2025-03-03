import {Router} from 'express'
import {createNewUser, getAllUsers} from "../controllers/users.controller.js";
import {authorize} from "../middlewares/authorize.js";
import checkCache from "../middlewares/check-cache.js";
import {setCacheKey} from "../utils/caching.js";

const userRouter = Router();

//create new user
userRouter.post('/',setCacheKey("newUser"),checkCache, createNewUser);
//get all users
userRouter.get('/',setCacheKey("users"),checkCache, getAllUsers);



export default userRouter;