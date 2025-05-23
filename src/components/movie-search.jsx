import GenreList from "./genre-list.jsx";
import {useState} from "react";
import MoviesList from "./movies-list.jsx";
import Movie from "../classes/Movie.js";

const MovieSearch = ({genres}) => {

    const [movies, setMovies] = useState([]);

    const onGenreClick = async (genre) => {

        let id = genre.id;
        let result = await fetch(`/api/get-movies?genre_id=${id}`);
        let data = await result.json();

        let newMovies = data.json.results.map((item, index) => {
            return new Movie(item);
        })

        //newMovies = newMovies.pop();

        //console.log(newMovies);

        setMovies(newMovies);
    }

    return (
        <div className="movie-search-section">
            <p>Search for a movie below in the following genres!</p>
            <GenreList genres={genres} onGenreClick={onGenreClick}/>
            <MoviesList movies={movies}/>
        </div>
    )
}
export default MovieSearch
