import Utilities from "../../utilities";
import GenreButton from "../genre-button";
import {JSX, useEffect, useState} from "react";

import './single-movie.css';
import ReviewCards from "@components/reviews/reviewCards/reviewCards";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SimilarMovies from "@components/similarMovies/similar-movies";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";

import MovieActors from "@components/actorProfile/movie-actors";
import MovieKeywords from "@components/movieKeywords/movie-keywords";

import {Helmet} from "react-helmet";
import CollectionDetails from "@components/collections/collectionDetails";
import {Movie} from "@contracts/movie";


/**
 * Used to show a single movie on its own page
 * @param movie
 * @returns {JSX.Element}
 * @constructor
 */
type SingleMovieProps = {
    movie: Movie
}
const SingleMovie = ({movie}: SingleMovieProps): JSX.Element => {

    const getProductionCompanies = (): JSX.Element | null => {

        if (!movie || !movie.production_companies) return null;
        if (movie.production_companies.length === 0) {

            return (
                <div className="production-companies-section mt-4">
                    <h3 className="section-title">Production Companies</h3>
                    <p>There are no production companies associated with this movie</p>
                </div>
            )
        } else {
            return (
                <div className="production-companies-section mt-4">
                    <h3 className="section-title">Production Companies</h3>
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
                        {movie.belongs_to_collection &&
                            <CollectionDetails id={movie.belongs_to_collection.id}/>
                        }
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
