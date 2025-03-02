import {Router} from 'express'
import {createNewUser, getAllUsers} from "../controllers/users.controller.js";
import {authorize} from "../middlewares/authorize.js";

const userRouter = Router();

//create new user
userRouter.post('/', createNewUser);
//get all users
userRouter.get('/', getAllUsers);



export default userRouter;