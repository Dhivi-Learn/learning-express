import Movie from "../models/movies.model.js";
import MoviesResponse from "../models/response/movies-response.model.js";
import sendMailAsync from "../utils/send-email.js";


export const getAllMovies = async (req, res) => {
    const cacheKey = "movies";
    req.cacheKey = cacheKey;
    const movies = await Movie.find().sort({year: -1}).limit(100).lean()
    const moviesResponse = movies.map(movie =>  new MoviesResponse(movie));
    // await redisClient.setex(cacheKey, 60, JSON.stringify(moviesResponse));
    return res.status(200).json({source:'api',data:moviesResponse});

}

export const createMovie = async(req,res)=>{
    const movie = await Movie.create(req.body);
    res.status(201).json({message: `${req.body.title} Movie created successfully`,...movie});
}

export const uploadFile = async(req,res,next)=>{
        if(!req.files) console.error("No file uploaded");
        else {
            console.log("File uploaded", req.file);
            res.status(200).json({message: "File uploaded successfully",file:req.file});
        }
    }

export const emailMovieDetails = async(req,res)=>{
    const info = await sendMailAsync({
        message: 'THE MOVIE IS GOOD TO WATCH',
        to: req.body.email,
        subject: 'Movie Details',
    })
    if(info) res.status(200).json({message: `Email sent successfully to ${req.body.email}`});
    else res.status(500).json({message: 'Failed to send email'});
}

