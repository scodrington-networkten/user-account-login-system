import MovieCard from "./movieCard/movie-card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import './movie-list.css';
import LoadingCardList from "@components/loading-card-list";
import {MovieResult} from "@contracts/movieResult";
import {JSX} from "react";
import {Movie} from "@contracts/movie";


type MovieListProps = {
    movies: MovieResult[] | Movie[],
    onNextButton?: () => void,
    onPrevButton?: () => void,
    currentPage?: number,
    totalPages?: number,
    totalResults?: number,
    searchQuery?: string | null,
    onPagesButton?: (page: number) => void,
    loading?: boolean,
    showPagination?: boolean,
    showHeader?: boolean,
    cssClasses?: string
}
const MoviesList = ({
                        movies,
                        onNextButton,
                        onPrevButton,
                        currentPage = 1,
                        totalPages = 0,
                        totalResults = 0,
                        searchQuery = null,
                        onPagesButton,
                        loading,
                        showPagination = true,
                        showHeader = false,
                        cssClasses = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    }: MovieListProps) => {


    /***
     * Display all movies for the user
     */
    const displayMovies = (): JSX.Element => {

        if (movies.length > 0) {
            return (
                <section
                    className={`movies container m-auto grid gap-4 ${cssClasses}`}>
                    {movies.map((item, index) => (
                        <MovieCard movie={item} classes="movie-card" key={`movie-${index}`}/>
                    ))}
                </section>
            )
        } else {
            return (
                <section className={`movies container m-auto grid gap-4`}>
                    <p>There are no movies to show</p>
                </section>
            )
        }
    }


    /**
     * Get page numbers, factoring in the current page and prev / next pages
     */
    const getPageNumbers = (pageLocation: string): JSX.Element | null => {

        if (typeof onPagesButton !== 'function') return null;

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
                        key={`${pageLocation}-${index}`}
                        className={` page ${item === currentPage ? 'active' : ''}`}>{item}</button>
                })}
            </>

        )
    }

    /**
     * Display the navigation elements, page numbers and next/prev
     * @param pageLocation
     */
    const displayNavigation = (pageLocation: string): JSX.Element | null => {

        if (!showPagination) return null;

        if (movies.length === 0) return null;

        if (totalPages === 1) return null;

        return (
            <div className="navigation container m-auto">
                <section className="results-nav flex align-center">
                    <button
                        disabled={currentPage === 1}
                        className="prev"
                        title="Previous Page"
                        aria-label="Previous Page"
                        onClick={onPrevButton}>
                        <FontAwesomeIcon className="" icon={faChevronLeft}/>
                    </button>
                    <button
                        disabled={currentPage > totalPages}
                        className="next"
                        title="Next Page"
                        aria-label="Next Page"
                        onClick={onNextButton}><FontAwesomeIcon className="" icon={faChevronRight}/></button>

                </section>
                <div className="page-numbers">
                    {getPageNumbers(pageLocation)}
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
                    <div className="results-data mb-2">
                        <p><span className="records-found font-semibold">{totalResults}</span> Movies Found</p>
                        <p>(Page <span className="font-semibold">{currentPage}</span> of <span
                            className="font-semibold">{totalPages})</span></p>
                    </div>
                </div>
            )
        } else {

            if (showHeader) {
                return (
                    <div className="results-header container m-auto">
                        <h1 className="text-3xl mt-4 mb-2">Movie Results</h1>
                        <div className="results-data mb-2">
                            <p><span className="records-found font-semibold">{totalResults}</span> Movies Found</p>
                            <p>(Page <span className="font-semibold">{currentPage}</span> of <span
                                className="font-semibold">{totalPages})</span></p>
                        </div>
                    </div>
                )
            } else {
                return <div className="results-header container m-auto"></div>
            }
        }
    }

    if (loading) {
        return (
            <div className="movies-list relative container m-auto">
                <LoadingCardList cssClass={cssClasses} items={4}/>
            </div>
        )
    } else {
        return (
            <div className="movies-list relative container m-auto">
                {displayHeader()}
                {displayNavigation('header')}
                {displayMovies()}
                {displayNavigation('footer')}
            </div>
        )
    }


}
export default MoviesList;
