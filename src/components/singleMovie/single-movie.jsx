import Utilities from "../../utilities.jsx";
import GenreButton from "../genre-button.jsx";
import {useEffect, useState} from "react";

import './single-movie.css';
import _ from "lodash";

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

    const utilities = new Utilities();
    /** @type {MovieDetails | null} */
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {

        //setup cached data
        let cache = (sessionStorage.getItem('movie_details_cache') !== null) ? JSON.parse(sessionStorage.getItem('movie_details_cache')) : null;
        if (cache !== null) {
            if (cache[movie.id] !== undefined) {
                setMovieDetails(/** @type {MovieDetails} */ cache[movie.id]);
                return;
            }
        }

        const getMovieDetails = async () => {
            const response = await fetch(`/api/get-movie-details?id=${movie.id}`);
            return response.json();
        }
        getMovieDetails().then(json => {
            setMovieDetails(/** @type {MovieDetails} */ json);

            let newCache = (cache !== null) ? {...cache, [movie.id]: json} : {[movie.id]: json};
            sessionStorage.setItem('movie_details_cache', JSON.stringify(newCache));

        });

    }, [movie.id])

    const getProductionCompanies = () => {

        let baseUrl = `https://image.tmdb.org/t/p/w200`;
        return (
            <div className="production-companies">
                {movieDetails.production_companies.map((item, index) => {

                    return (
                        item.logo_path && (
                            <img
                                className="production-company"
                                key={`production-company-${index}`}
                                src={`${baseUrl}/${item.logo_path}`}
                                alt={item.name || "Logo"}
                            />
                        )
                    );
                })}
            </div>
        );

    }


    return (
        <article className="single-movie flex gap-3 flex-grow p-12 relative">
            <div className="top-gradient"></div>
            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className="absolute object-cover z-0 opacity-5 top-0 left-0 h-full"
                alt="background-image"
            />
            <div className="container m-auto flex mt-0 flex-wrap gap-4">
                <section className="primary flex flex-col justify-start flex-start items-start z-1 w-1/2 flex-grow-1">
                    <h1 className="font-bold text-4xl mb-8">{movie.title}</h1>
                    <div className="overview mb-8 text-1xl items-start font-light">{movie.overview}</div>
                    <div className="review-stars-section">{utilities.getStarsSection(movie.vote_average)}</div>
                    <div className="review-count-section">{utilities.getVotesSection(movie.vote_count)}</div>

                    <section className="genre-section mt-8 flex gap-4">
                        {movie.genres.map((item, index) => (
                            <GenreButton genre={item}/>
                        ))}
                    </section>

                </section>

                <section className="secondary w-1/3">
                    <div className="image-section shadow-xl">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="object-cover rounded-lg transform transition-transform duration-200 ease-out-in scale-100 group-hover:scale-110"
                        />
                    </div>
                </section>

                <section className="bottom-section w-full mt-2">
                    {movieDetails &&
                        <>
                            <div className="production-companies">
                                {getProductionCompanies()}
                            </div>
                            <p>Revenue: {movieDetails.revenue}</p>
                        </>

                    }
                </section>
            </div>


        </article>

    )
}
export default SingleMovie
