import {useState} from "react";
import MovieCard from "./movie-card.jsx";

const MoviesList = ({movies}) => {

    /***
     * Display all movies for the user
     * @returns {JSX.Element}
     */
    const displayMovies = () => {

        if (movies.length > 0) {
            return (
                <section className="movies grid grid-cols-4 gap-4 p-4">
                    {movies.map((item, index) => (
                        <MovieCard movie={item} className="movie" key={`movie-${index}`}/>
                    ))}
                </section>
            )
        }
    }

    return (
        <div className="movies-list">
            <p>Here are your matched movies</p>
            {displayMovies()}
        </div>
    )
}
export default MoviesList;
