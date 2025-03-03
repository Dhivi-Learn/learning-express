import {Router} from "express";
import {createMovie, emailMovieDetails, getAllMovies, uploadFile} from "../controllers/movies.controller.js";

const moviesRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: List of Movies (controller)
 * /Movies:
 *   get:
 *     summary: Get all Movies!
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
moviesRouter.get("/", getAllMovies)

moviesRouter.post("/",createMovie)

moviesRouter.post("/upload",uploadFile)

moviesRouter.post("/send-email",emailMovieDetails)


export default moviesRouter;

