import {Router} from "express";
import {createMovie, emailMovieDetails, getAllMovies, uploadFile} from "../controllers/movies.controller.js";
import multer from "multer";

const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    }
});

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

moviesRouter.post("/upload",upload.array("files", 2),uploadFile)

moviesRouter.post("/send-email",emailMovieDetails)


export default moviesRouter;

