import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    plot: String,
    released: String,
    poster: String,
    rating: Number,
    languages: {
        type: Array,
        required: true,
    },
    directors:{
        type: Array,
        required: true,
    }
});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;