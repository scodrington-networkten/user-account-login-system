import {useState} from "react";
import MovieCard from "./movieCard/movie-card.jsx";
import './movie-list.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faSearch} from "@fortawesome/free-solid-svg-icons";


const MoviesList = ({
                        movies,
                        onNextButton,
                        onPrevButton,
                        currentPage,
                        totalPages,
                        totalResults,
                        searchQuery = null,
                        onPagesButton,
                        loading
                    }) => {


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


    /**
     * Get page numbers, factoring in the current page and prev / next pages
     * @param location
     * @returns {JSX.Element}
     */
    const getPageNumbers = (location) => {

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
                    return <button
                        onClick={() => {
                            onPagesButton(item);
                        }}
                        title={`Page ${item}`}
                        key={`${location}-${index}`}
                        className={` page ${item === currentPage ? 'active' : ''}`}>{item}</button>
                })}
            </>

        )
    }

    /**
     * Display the navigation elements, page numbers and next/prev
     * @param location
     * @returns {JSX.Element}
     */
    const displayNavigation = (location) => {

        if(totalPages === 1) return null;

        return (
            <div className="navigation container m-auto">
                <section className="results-nav flex align-center">
                    {currentPage > 1 &&
                        <button
                            className="prev"
                            title="Previous Page"
                            onClick={onPrevButton}>
                            <FontAwesomeIcon className="" icon={faChevronLeft}/>
                        </button>
                    }
                    {currentPage < totalPages &&
                        <button
                            className="next"
                            title="Next Page"
                            onClick={onNextButton}><FontAwesomeIcon className="" icon={faChevronRight}/></button>
                    }
                </section>
                <div className="page-numbers">
                    {getPageNumbers(location)}
                </div>
            </div>
        )
    }

    /**
     * Displays the title and the number of overall items found
     * @returns {JSX.Element}
     */
    const displayHeader = () => {

        if (searchQuery !== null) {
            return (
                <div className="results-header container m-auto">
                    <h1 className="text-3xl mt-4 mb-2">Search Results: <span
                        className="italic font-semibold">{searchQuery}</span></h1>
                    <div className="results-data">
                        <p><span className="records-found font-semibold">{totalResults}</span> Movies Found</p>
                        <p>(Page <span className="font-semibold">{currentPage}</span>  of <span className="font-semibold">{totalPages})</span></p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="results-header container m-auto">
                    <h1 className="text-3xl mt-4 mb-2">Movie Results</h1>
                </div>
            )
        }
    }

    return (
        <div className="movies-list relative">

            {loading &&
                <p>Results loading</p>
            }
            {!loading && (
                <>
                    {displayHeader()}
                    {displayNavigation('header')}
                    {displayMovies()}
                    {displayNavigation('footer')}
                </>
            )}
        </div>
    )
}
export default MoviesList;
