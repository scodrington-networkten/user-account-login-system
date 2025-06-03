import _ from 'lodash';
import '../assets/scss/movie.scss';
import {Link} from "react-router-dom";


import './movie-card.css';
import Utilities from "../utilities.jsx";

const MovieCard = ({movie}) => {

    const utilities = new Utilities();

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
            </section>
        )
    }

    return (
        <article className="movie-card group">
            <Link
                to={`/movie/${movie.id}`}
                className="block w-full h-full flex relative"
            >
                <section className="overflow-hidden">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="image-section"
                    />
                </section>

                <section
                    className="main-section">
                    <div className="main-section-inner">
                        <section
                            className="movie-information-section -translate-y-10 transform transition duration-250 ease-in-out">
                            <h3 className="text-3xl mb-2 font-semibold " title={movie.title}>
                                {movie.title}
                            </h3>
                        </section>

                        <section
                            className="bottom-section ">
                            {getRatingSection(movie)}
                            <section className="summary-section multiline-clamp">
                                <p className="summary text-base">{movie.overview}</p>
                            </section>
                            <hr className="bottom-accent mt-2"/>
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
