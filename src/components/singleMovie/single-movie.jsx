import Utilities from "../../utilities";
import GenreButton from "../genre-button.tsx";
import {useEffect, useState} from "react";

import './single-movie.css';
import ReviewCards from "@components/reviews/reviewCards/reviewCards.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SimilarMovies from "@components/similarMovies/similar-movies.jsx";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";

import MovieActors from "@components/actorProfile/movie-actors.jsx";
import MovieKeywords from "@components/movieKeywords/movie-keywords.jsx";

import {Helmet} from "react-helmet";
import CollectionDetails from "@components/collections/collectionDetails.jsx";

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
                            let finalUrl = Utilities.getApiImageUrl(item.logo_path, {type: 'logo', size: 'w154'});
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
            <article className="single-movie">
                <div className="container">

                    <section className="secondary">
                        <div className="image-section">
                            <img
                                src={Utilities.getApiImageUrl(movie.poster_path, {type: 'poster', size: 'w342'})}
                                alt={movie.title}
                                className="poster-image "
                            />
                        </div>
                    </section>
                    <section className="primary">
                        <h1>{movie.title}</h1>
                        {movie?.tagline && <h3 className="tagline">{movie.tagline}</h3>}

                        <div className="release-date">
                            <p><FontAwesomeIcon icon={faCalendar}/> {Utilities.formatDate(movie.release_date)}</p>
                        </div>

                        <div className="review-section">
                            <div className="review-stars-section">{Utilities.getStarsSection(movie.vote_average)}</div>
                            <div className="review-count-section">{Utilities.getVotesSection(movie.vote_count)}</div>
                        </div>

                        <section className="genre-section">
                            {movie.genres.map((item, index) => (
                                <GenreButton genre={item} key={`genre-button-${index}`}/>
                            ))}
                        </section>
                        <div className="overview">{movie.overview}</div>
                        <section className="actors-section w-full">
                            <MovieActors movie={movie}/>
                        </section>
                    </section>


                </div>
                <div className="container">
                    <section className="bottom-section">
                        <ReviewCards movie={movie}/>
                        <CollectionDetails id={movie?.belongs_to_collection?.id}/>
                        <SimilarMovies movie={movie}/>
                        <MovieKeywords movie={movie}/>
                        {getProductionCompanies()}
                    </section>
                </div>

                <img
                    src={Utilities.getApiImageUrl(movie.backdrop_path, {type: 'backdrop', size: 'w1280'})}
                    className="background-image "
                    alt="background-image"
                />
            </article>

        </>
    )
}
export default SingleMovie

/**
 *
 *
 *
 *
 *
 *
 *
 */
