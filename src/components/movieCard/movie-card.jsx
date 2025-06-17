import _ from 'lodash';
import {Link} from "react-router-dom";
import Utilities from "../../utilities.jsx";
import {useUser} from "@contexts/UserContext.jsx";

import './movie-card.css';

import FavoriteMovieButton from "@components/favoriteMovieButton/favoriteMovieButton.jsx";


import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faBookmark as faBookmarkEmpty} from "@fortawesome/free-regular-svg-icons";
import {faBookmark as faBookmarkFull} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as util from "node:util";

const MovieCard = ({movie}) => {

    const utilities = new Utilities();

    const {user} = useUser();


    /**
     * Displays both the vote count section and the rating stars
     * @param movie
     * @returns {JSX.Element}
     */
    const getRatingSection = (movie) => {
        return (
            <section className="rating-information flex gap-2 mb-3 justify-between">

                {utilities.getStarsSection(movie.vote_average)}
                {utilities.getVotesSection(10)}
                <FavoriteMovieButton movie={movie}/>
            </section>
        )
    }


    const getSummarySection = (movie) => {
        return (
            <p className="summary text-base">{utilities.getTrimmedString(movie.overview, 150)}</p>
        )
    }

    return (
        <article className="movie-card group">

            <section className="overflow-hidden">
                <img
                    src={Utilities.getApiImageUrl(movie.poster_path, 'poster', 'w342')}
                    alt={movie.title}
                    className="image-section"
                />
            </section>

            <section
                className="main-section">
                <div className="main-section-inner">
                    <section
                        className="movie-information-section -translate-y-10 transform transition duration-250 ease-in-out">
                        <Link to={`/movie/${movie.id}`}>
                            <h3 className="text-3xl mb-2 font-semibold " title={movie.title}>
                                {movie.title}
                            </h3>
                        </Link>
                    </section>

                    <section
                        className="bottom-section ">
                        {getRatingSection(movie)}
                        <section className="summary-section multiline-clamp">
                            {getSummarySection(movie)}
                        </section>
                        <hr className="bottom-accent mt-2"/>
                    </section>

                    <section className="genre-section hidden">
                        {movie.genre_ids?.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </section>


                </div>
            </section>
        </article>
    )
}
export default MovieCard
