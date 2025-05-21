import GenreList from "./genre-list.jsx";
import {useState} from "react";

const MovieSearch = ({genres}) => {

    const [movies, setMovies] = useState(['hello world', 'test']);

    const onGenreClick = (genreName) => {
        alert(genreName);

        //search for movies with that genre as the query
    }

    /***
     * Display all movies for the user
     * @returns {JSX.Element}
     */
    const displayMovies = () => {

        if(movies.length > 0){
            return (
                <section className="movies">
                    {movies.map((item, index) => (
                        <div className="movie" key={`movie-${index}`}>{item}</div>
                    ))}
                </section>
            )
        }
    }

    return (
        <div className="movie-search-section">
            <p>Search for a movie below in the following genres!</p>
            <GenreList genres={genres} onGenreClick={onGenreClick}/>
            {displayMovies()}
        </div>
    )
}
export default MovieSearch
