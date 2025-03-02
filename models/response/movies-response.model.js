class MoviesResponse{
    constructor(movie) {
        this.movieName = movie.title;
        this.story = movie.plot;
        this.releaseYear = movie.year;
    }
}

export default MoviesResponse