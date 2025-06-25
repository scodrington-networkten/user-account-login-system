import {Link} from "react-router-dom";

import {faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './carousel-card.css';

import {GenreContext} from "../../contexts/GenreContext.jsx";
import {useContext} from "react";

import _ from "lodash";
import GenreButton from "@components/genre-button.jsx";

const CarouselCard = ({movie}) => {

    /**
     * @type {{ genres: { id: number, name: string }[] }}
     */
    const context = useContext(GenreContext);
    const {genres} = context;

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
            genre = {id: 0, name: 'undefined'}
        }

        //leverage the existing genre button to show these genres
        return (
            <GenreButton
                classes={'button-small button-transparent'}
                genre={genre}
                isActive={false}
                key={`genre-button-${genre.id}`}
            />

        )
    }

    /**
     * Outputs the summary section for both mobile and desktop
     * @param movie
     * @returns {JSX.Element}
     */
    const getSummarySection = (movie) => {

        let fullSummary = movie.overview;
        let mobileSummary = _.truncate(movie.overview, {length: 200});

        return (
            <>
                <div className="movie-summary movie-summary-short ">{mobileSummary}</div>
                <div className="movie-summary movie-summary-long ">{fullSummary}</div>
            </>

        )
    }

    return (
        <article className="carousel-card relative h-[450px] md:h-[450px] lg:h-[600px] bg-gray-600">
            <div className="background-hero-image-overlay"></div>
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="background-hero-image absolute w-full h-full top-0 z-0"
            ></div>
            <div
                className="main-container h-full m-auto container flex flex- relative z-1 p-4 gap-2 md:pt-22 md:gap-4 lg:pt-26 lg:gap-8 ">
                <section className="right flex-grow-0 hidden md:block mt-0">
                    <div className="image-section shadow-xl">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className=" rounded-lg h-full w-auto max-h-[300px] lg:max-h-[350px] xl:max-height-[400px]"
                        />
                    </div>
                </section>
                <section className="left w-full md:w-auto mt-[85px] md:mt-0  flex-grow-1 text-white md:max-w-[70%]">
                    <section className="primary flex gap-2 flex-col justify-start flex-start items-start z-1">
                        <Link className="" to={`/movie/${movie.id}`}>
                            <h1 className="title">{movie.title}</h1>
                        </Link>

                        {getSummarySection(movie)}

                        <section
                            className="genre-section button-list flex flex-wrap gap-1 mb-2 md:mb-3 lg:mb-4 mb:gap-2">
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
