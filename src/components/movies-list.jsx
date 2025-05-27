import {useState} from "react";
import MovieCard from "./movie-card.jsx";
import '../assets/scss/movie-list.scss';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';


const MoviesList = ({movies, onNextButton, onPrevButton, moviesLoading, currentPage, totalPages}) => {

    /***
     * Display all movies for the user
     * @returns {JSX.Element}
     */
    const displayMovies = () => {


        if (movies.length > 0) {
            return (
                <section className={`movies grid grid-cols-4 gap-4 p-4 ${moviesLoading ? 'loading' : ''}`}>
                    {movies.map((item, index) => (
                        <MovieCard movie={item} className="movie" key={`movie-${index}`}/>
                    ))}
                </section>
            )
        }
    }

    return (
        <div className="movies-list relative">

            {moviesLoading &&
                <span
                    className=" text-3xl loading-icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1">
                    Loading <FontAwesomeIcon icon={faSpinner} spin/>
                </span>
            }

            <p>Here are your matched movies</p>
            {displayMovies()}
            <section className="flex align-center">
                {currentPage > 1 &&
                    <button className="previous-button" onClick={onPrevButton}>Previous</button>
                }
                {currentPage <= totalPages &&
                    <button className="next-button" onClick={onNextButton}>Next</button>
                }
            </section>

        </div>
    )
}
export default MoviesList;
