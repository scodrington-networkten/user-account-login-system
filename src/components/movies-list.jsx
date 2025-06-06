import {useState} from "react";
import MovieCard from "./movieCard/movie-card.jsx";
import './movie-list.css';


const MoviesList = ({movies, onNextButton, onPrevButton, currentPage, totalPages, loading, onPagesButton}) => {

    /***
     * Display all movies for the user
     * @returns {JSX.Element}
     */
    const displayMovies = () => {

        if (movies.length > 0) {
            return (
                <section
                    className={`movies grid grid-cols-2 container m-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4`}>
                    {movies.map((item, index) => (
                        <MovieCard movie={item} className="movie" key={`movie-${index}`}/>
                    ))}
                </section>
            )
        }
    }

    const getPageNumbers = () => {


        const range = 2; // Number of pages to show before and after current
        let pages = [];

        for (let i = currentPage - range; i <= currentPage + range; i++) {
            if (i >= 1 && i <= totalPages) {
                pages.push(i);
            }
        }

        return (
            <>
                {pages.map((item, index) => {
                    return <span
                        onClick={() => {  onPagesButton(item); }}
                        key={index}
                        className={`page ${item === currentPage ? 'active' : ''}`}>{item}</span>
                })}
            </>

        )
    }

    return (
        <div className="movies-list relative">

            {displayMovies()}
            <section className="results-nav flex align-center">
                {currentPage > 1 &&
                    <button className="prev" onClick={onPrevButton}>Previous</button>
                }
                {currentPage < totalPages &&
                    <button className="next" onClick={onNextButton}>Next</button>
                }
            </section>

            <div className="page-numbers">
                {getPageNumbers()}
            </div>

        </div>


    )
}
export default MoviesList;
