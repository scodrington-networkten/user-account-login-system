import _ from 'lodash';
import '../assets/scss/movie.scss';
import {Link} from "react-router-dom";

import {faStar as faStarFull, faStarHalfAlt as faStarHalf} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Utilities from "../utilities.js";

const MovieCard = ({movie}) => {


    /**
     * Given a rating out of 5, determine if it should be a full, empty or half star based on its value
     * @param rating
     * @returns {unknown[]}
     */
    function getStarIcons(rating) {

        const result = Array.from({length: 5}, (item, index) => {
            const slot = index + 1;
            if (rating >= slot) {
                return faStarFull;
            } else if (rating >= slot - 0.5) {
                return faStarHalf;
            } else {
                return faStarEmpty;
            }
        });
        return result;
    }


    /**
     * Shows the total number of people giving this a thumbs up
     * @param votes
     * @returns {JSX.Element}
     */
    const getVotesSection = (votes) => {

        return (
            <section className="vote-information flex gap-2 justify-center">
                <span className="vote-icon">
                    <FontAwesomeIcon icon={faThumbsUp}/>
                </span>
                <span className="vote-score">
                    {votes}
                </span>

            </section>
        )

    }

    /**
     * gets the rating section, showing the movie score out of 5 stars
     * @param voteAverage
     * @returns {JSX.Element}
     */
    const getStarsSection = (voteAverage) => {

        //convert from a score of 0-10 to 0-5
        let baseScore = (voteAverage / 2);
        //round to the nearest 0.5
        let newScore = new Utilities().round(baseScore, 0.5);
        //determine what icons to use
        let iconsArray = getStarIcons(newScore);

        return (
            <section className="stars-information">
                {
                    iconsArray.map((item, index) => {
                        return <span className="item"><FontAwesomeIcon icon={item}/></span>
                    })
                }

            </section>
        );
    }

    /**
     * Displays both the vote count section and the rating stars
     * @param movie
     * @returns {JSX.Element}
     */
    const getRatingSection = (movie) => {
        return (
            <section className="rating-information flex gap-2 mb-3 justify-between">
                {getStarsSection(movie.vote_average)}
                {getVotesSection(movie.vote_count)}
            </section>
        )
    }

    return (
        <article className="movie-card flex relative group">
            <Link
                to={`/movie/${movie.id}`}
                className="block w-full h-full flex"
            >
                <section className="image-section overflow-hidden">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="object-cover transform transition-transform duration-200 ease-out-in scale-100 group-hover:scale-110"
                    />
                </section>

                <section
                    className="main-section flex flex-col h-full w-full absolute bg-black text-white opacity-0 group-hover:opacity-80 transition-opacity">
                    <div
                        className="flex flex-col flex-grow justify-between px-4 py-4 box-content leading-tight overflow-hidden">
                        <section
                            className="movie-information-section -translate-y-10 group-hover:translate-y-0 transform transition duration-250 ease-in-out">
                            <h3 className="text-3xl mb-2" title={movie.title}>
                                {movie.title}
                            </h3>
                        </section>

                        <section
                            className="bottom-section transform transition duration-300 ease-in-out group-hover:translate-y-0 translate-y-10">
                            {getRatingSection(movie)}
                            <section className="summary-section multiline-clamp">
                                <p className="summary text-base">{movie.overview}</p>
                            </section>
                        </section>

                        <section className="genre-section hidden">
                            {movie.genre_ids.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </section>
                    </div>
                </section>
            </Link>
        </article>
    )
}
export default MovieCard
