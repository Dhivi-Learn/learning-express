import {Router} from "express";
import CommentsModel from "../models/comments.model.js";

const commentsRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: List of comments (controller)
 * /comments:
 *   get:
 *     summary: Get all comments!
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
commentsRouter.get('/', async(req,res)=>{

    const comments = await CommentsModel.find().sort({date:-1}).limit(100).lean();
    res.send(comments).status(200).end();
})

export default commentsRouter;