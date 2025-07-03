import Utilities from "../../utilities.jsx";
import GenreButton from "../genre-button.jsx";
import {useEffect, useState} from "react";

import './single-movie.css';

import ActorProfile from "../actorProfile/actorProfile.jsx";
import ReviewCards from "@components/reviews/reviewCards/reviewCards.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import SimilarMovies from "@components/similarMovies/similar-movies.jsx";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";

import MovieActors from "@components/actorProfile/movie-actors.jsx";
import MovieKeywords from "@components/movieKeywords/movie-keywords.jsx";

import {Helmet} from "react-helmet";

/**
 * @typedef {Object} MovieDetails
 * @property {boolean} adult
 * @property {string} backdrop_path
 * @property {{id: number, name: string}[]} genres
 * @property {{id: number, logo_path: string, name: string, origin_country: string}[]} production_companies
 * @property {int} revenue
 * @property {int} budget
 * @property {string} status
 * @property {string} tagline
 * @property {string} title
 * @property {int} runtime
 * @property {string} homepage
 * @property {{english_name: string, iso_639_1: string, name: string}[]} spoken_languages
 */


/**
 * Used to show a single movie on its own page
 * @param movie
 * @returns {JSX.Element}
 * @constructor
 */
const SingleMovie = ({movie}) => {

    const [actors, setActors] = useState(null);


    const getProductionCompanies = () => {

        if (!movie) return null;

        if (movie.production_companies.length === 0) {

            return (
                <div className="production-companies-section mt-4">
                    <h3 className="">Production Companies</h3>
                    <p>There are no production companies associated with this movie</p>
                </div>
            )
        } else {
            return (
                <div className="production-companies-section mt-4">
                    <h3 className="">Production Companies</h3>
                    <div className="companies">
                        {movie.production_companies.map((item, index) => {
                            let finalUrl = Utilities.getApiImageUrl(item.logo_path, 'logo', 'w154');
                            return (
                                item.logo_path && (
                                    <img
                                        className="company"
                                        key={`production-company-${index}`}
                                        src={`${finalUrl}`}
                                        alt={item.name || "Logo"}
                                    />
                                )
                            );
                        })}
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            <Helmet>
                <title>{Utilities.getSiteNameForPage(movie.title)}</title>
            </Helmet>
            <article className="single-movie flex gap-4 flex-grow relative p-4 w-full">

                <div className="container m-auto flex mt-0 flex-wrap">
                    <section
                        className="primary flex flex-col justify-start flex-start items-start z-1 w-1/2 flex-grow-1 md:mt-4 gap-y-1 md:gap-y-2">
                        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl">{movie.title}</h1>
                        {movie?.tagline &&
                            <h3 className="tagline">{movie.tagline}</h3>
                        }

                        <div className="release-date">
                            <p><FontAwesomeIcon icon={faCalendar}/> {Utilities.formatDate(movie.release_date)}</p>
                        </div>
                        <div className="review-section flex gap-4 mb-2">
                            <div className="review-stars-section">{Utilities.getStarsSection(movie.vote_average)}</div>
                            <div className="review-count-section">{Utilities.getVotesSection(movie.vote_count)}</div>
                        </div>

                        <section className="genre-section mb-4 flex gap-1 md:gap-2">
                            {movie.genres.map((item, index) => (
                                <GenreButton genre={item} key={`genre-button-${index}`}/>
                            ))}
                        </section>

                        <div className="overview text-1xl items-start font-light">{movie.overview}</div>

                        <section className="actors-section w-full">
                            <MovieActors movie={movie}/>
                        </section>
                    </section>

                    <section className="secondary hidden md:flex w-1/3 md:mt-4">
                        <div className="image-section s">
                            <img
                                src={Utilities.getApiImageUrl(movie.poster_path, 'poster', 'w342')}
                                alt={movie.title}
                                className="shadow-xl object-cover rounded-lg transform transition-transform duration-200 ease-out-in scale-100 group-hover:scale-110"
                            />
                        </div>
                    </section>

                    <section className="bottom-section w-full">

                        <MovieKeywords movie={movie}/>

                        <SimilarMovies movie={movie}/>

                        {getProductionCompanies()}

                        <ReviewCards movie={movie}/>

                    </section>
                </div>
                <img
                    src={Utilities.getApiImageUrl(movie.backdrop_path, 'backdrop', 'w1280')}
                    className="absolute object-cover -z-100 opacity-5 top-0 left-0 h-full w-full -z-1"
                    alt="background-image"
                />

            </article>
        </>
    )
}
export default SingleMovie
