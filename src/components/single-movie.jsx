import Utilities from "../utilities.jsx";
import GenreButton from "./genre-button.jsx";

/**
 * Used to show a single movie on it's own page
 * @param movie
 * @returns {JSX.Element}
 * @constructor
 */
const SingleMovie = ({movie}) => {

    const utilities = new Utilities();

    return (
        <article className="single-movie flex gap-3 p-12 relative">
            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className="absolute object-cover z-0 opacity-5 top-0 left-0"
            />
            <section className="primary flex flex-col justify-start flex-start items-start z-1">
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

            <section className="secondary">
                <div className="image-section shadow-xl">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="object-cover rounded-lg transform transition-transform duration-200 ease-out-in scale-100 group-hover:scale-110"
                    />
                </div>
            </section>


        </article>

    )
}
export default SingleMovie
