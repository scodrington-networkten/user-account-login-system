import {Link} from "react-router-dom";

import {faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './carousel-card.css';

import {GenreContext} from "../../contexts/GenreContext.jsx";
import {useContext} from "react";

import _ from "lodash";

const CarouselCard = ({movie}) => {

    const {genres} = useContext(GenreContext);

    /**
     * Given an  ID (representing a genre id), return a button component with its correct name
     * @param id
     * @returns {JSX.Element}
     */
    const getGenreButton = (id) => {

        //find the associated genre given the id
        let genre = _.find(genres, (item) => {
            return item.id === id;
        })

        if (!genre) {
            genre = {id: item, name: 'undefined'}
        }

        return (
            <p className="button-small button-transparent" key={`genre-button-${genre.id}`}>{genre.name}</p>
        )
    }

    /**
     * Outputs the summary section for both mobile and desktop
     * @param movie
     * @returns {JSX.Element}
     */
    const getSummarySection = (movie) => {

        let fullSummary = movie.overview;
        let mobileSummary =  _.truncate(movie.overview, {length: 200});

        return (
            <>
                <div className="movie-summary movie-summary-short ">{mobileSummary}</div>
                <div className="movie-summary movie-summary-long ">{fullSummary}</div>
            </>

        )
    }

    return (
        <article className="carousel-card relative h-[400px] md:h-[450px] lg:h-[600px] bg-gray-600">
            <div className="background-hero-image-overlay"></div>
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="background-hero-image absolute w-full h-full top-0 z-0"
            ></div>
            <div className="main-container m-auto container flex relative z-1 p-4 md:p-12 lg:p-16 gap-10">
                <section className="right md:mt-4 lg:mt-10 flex-grow-0 hidden md:block">
                    <div className="image-section shadow-xl">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className=" rounded-lg h-full w-auto max-h-[300px]"
                        />
                    </div>
                </section>
                <section className="left mt-[50px] md:mt-4 lg:mt-10 flex-grow-1 text-white md:max-w-[70%]">
                    <section className="primary flex gap-2 flex-col justify-start flex-start items-start z-1">
                        <h1 className="font-bold md:text-3xl lg-text-6xl text-3xl sm:mb-2 md:mb-4 lg:mb-6">{movie.title}</h1>
                        {getSummarySection(movie)}

                        <section className="genre-section button-list flex gap-1 sm:mb-2 md:mb-4 lg:mb-6">
                            {movie.genre_ids.map((item, index) => (
                                getGenreButton(item)
                            ))}
                        </section>

                        <div className="flex gap-2">
                            <Link className="action-button watch-button" to={`/movie/${movie.id}`}>
                                <FontAwesomeIcon icon={faPlay}/><p>Watch Now</p>
                            </Link>
                            <Link className="action-button add-to-list-button" to={`/movie/${movie.id}`}>
                                <FontAwesomeIcon icon={faPlus}/><p>Watchlist</p>
                            </Link>

                        </div>

                    </section>
                </section>
            </div>
        </article>
    )
}
export default CarouselCard
