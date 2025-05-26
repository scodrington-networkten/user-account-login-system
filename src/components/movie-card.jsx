import '../assets/scss/movie.scss';

import {faStar as faStarFull, faStarHalfAlt as faStarHalf} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import _ from 'lodash';

const MovieCard = ({movie}) => {

    /*
     * Round a number to a given step
     * @param value
     * @param step
     * @returns {number}
     */
    function round(value, step) {
        step || (step = 1.0);
        let inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }

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

    const formatDate = (dateString) => {

        if (_.isEmpty(dateString)) {
            console.log('an empty date string was passed');
            return '';
        }

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;

    }

    const getRatingSection = (voteAverage) => {

        //convert from a score of 0-10 to 0-5
        let baseScore = (voteAverage / 2);
        //round to the nearest 0.5
        let newScore = round(baseScore, 0.5);
        //determine what icons to use
        let iconsArray = getStarIcons(newScore);

        return (
            <section className="rating-information">
                {
                    iconsArray.map((item, index) => {
                        return <span className="vote-count"><FontAwesomeIcon icon={item}/></span>
                    })
                }

            </section>
        );
    }

    return (
        <article className="movie-card flex relative">

            <section className="image-section">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover"
                />
            </section>
            <section
                className="main-section flex flex-col h-full w-full absolute bg-black text-white opacity-50 hover:opacity-80 transition-opacity">
                <div className="flex flex-col flex-grow justify-between px-4 py-4 box-content leading-tight">
                    <section className="movie-information-section">
                        <h3 className="truncate text-2xl mb-2" title={movie.title}>
                            {movie.title}
                        </h3>
                        <p className="release-date">{formatDate(movie.release_date)}</p>
                        {getRatingSection(movie.vote_average)}
                    </section>
                    <section className="summary-section multiline-clamp">
                        <p className="summary text-base">{movie.overview}</p>
                    </section>

                    <section className="genre-section hidden">
                        {movie.genre_ids.map((item, index) => {
                            return <p key={index}>{item}</p>
                        })}
                    </section>
                </div>

            </section>


        </article>
    )
}
export default MovieCard
