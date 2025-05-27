import GenreList from "./genre-list.jsx";
import {useState, useEffect} from "react";
import MoviesList from "./movies-list.jsx";
import Movie from "../classes/Movie.js";

const MovieSearch = ({genres}) => {

    const [moviesLoading, setMoviesLoading] = useState(false);
    const [genre, setGenre] = useState('');
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    //sync genre and current page to call getMovies when updated
    useEffect(() => {
        if (genre) {
            getMovies(genre.id, currentPage);
        }
    }, [genre, currentPage])

    const onGenreClick = (genre) => {
        setGenre(genre);
        setCurrentPage(1);
    }

    const getMovies = async (genre_id, page) => {

        setMoviesLoading(true);

        console.log(`/api/get-movies?genre_id=${genre_id}&page=${page}`);
        let result = await fetch(`/api/get-movies?genre_id=${genre_id}&page=${page}`);
        let data = await result.json();

        console.log(data.json.results);

        let newMovies = data.json.results.map((item, index) => {
            return new Movie(item);
        })

        //set data about the movie results
        setTotalPages(data.json.total_pages);
        setTotalResults(data.json.total_results);
        setMovies(newMovies);

        setMoviesLoading(false);
    }

    const onNextButton = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    const onPreviousButton = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    return (
        <div className="movie-search-section">
            <p>Search for a movie below in the following genres!</p>
            <GenreList genres={genres} onGenreClick={onGenreClick}/>
            <MoviesList
                movies={movies}
                onNextButton={onNextButton}
                onPrevButton={onPreviousButton}
                moviesLoading={moviesLoading}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    )
}
export default MovieSearch
