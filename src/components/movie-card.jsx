import _ from 'lodash';
import '../assets/scss/movie.scss';
import {Link} from "react-router-dom";



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
        <article className="movie-card flex relative group drop-shadow-lg border-gray-300 border-1">
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
                            <h3 className="text-3xl mb-2 font-semibold" title={movie.title}>
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
