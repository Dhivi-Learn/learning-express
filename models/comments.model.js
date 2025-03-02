import mongoose, {Schema} from "mongoose";

const CommentsSchema = new Schema({
    name: String,
    email: String,
    movieId: String,
    text: String,
    date: String,
})

const Comment = mongoose.model("Comments", CommentsSchema)

export default Comment;