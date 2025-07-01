import _ from 'lodash';
import {Link} from "react-router-dom";
import Utilities from "../../utilities.jsx";
import {useUser} from "@contexts/UserContext.jsx";

import './movie-card.css';

import FavoriteMovieButton from "@components/favoriteMovieButton/favoriteMovieButton.jsx";
import {faBookmark as faBookmarkFull} from "@fortawesome/free-solid-svg-icons";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState, useRef} from "react";

const MovieCard = ({movie, classes = 'movie-card'}) => {

    const cardRef = useRef(null);
    const [touched, setTouched] = useState(false);
    const {user} = useUser();

    const [isFavorited, setIsFavorited] = useState(null);

    //determine if this movie is a users fav
    useEffect(() => {

        if (user === null) return;

        //determine if currently favorite
        const isFavorite = user.favorite_movies.some(item => {
            return item.movie_id === movie.id;
        });

        setIsFavorited(isFavorite);

    }, [user]);


    useEffect(() => {
        if (!touched) return;

        // Handler for any touch on the document
        const handleTouchOutside = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                setTouched(false);
            }
        };

        // Add listener when touched = true
        document.addEventListener('touchstart', handleTouchOutside);

        // Cleanup when touched changes or component unmounts
        return () => {
            document.removeEventListener('touchstart', handleTouchOutside);
        };
    }, [touched]);


    /**
     * Displays both the vote count section and the rating stars
     * @param movie
     * @returns {JSX.Element}
     */
    const getRatingSection = (movie) => {

        return (
            <section className="rating-information">
                {Utilities.getStarsSection(movie.vote_average)}
                {Utilities.getVotesSection(movie.vote_count)}
                <div className="flex flex-1 justify-end">
                    <FavoriteMovieButton movie={movie} isFavorited={isFavorited}/>
                </div>
            </section>
        )
    }


    const getSummarySection = (movie) => {
        return (
            <p className="summary ">{Utilities.getTrimmedString(movie.overview, 150)}</p>
        )
    }

    const getFavoritedBadge = (movie) => {

        if (!isFavorited) return;

        return (
            <div className="favorite-badge">
                <FontAwesomeIcon icon={faBookmarkFull}/>
            </div>
        )
    }

    return (
        <article
            tabIndex="0"
            onFocus={() => setTouched(true)}
            onBlur={() => setTouched(false)}
            className={` group ${touched ? 'touched' : ''} ${classes}`}
            onTouchStart={() => setTouched(true)}
            ref={cardRef}
        >
            {getFavoritedBadge()}
            <section className="image-container overflow-hidden w-full aspect-[2/3]">
                <img
                    src={Utilities.getApiImageUrl(movie.poster_path, 'poster', 'w342')}
                    srcSet={`${Utilities.getApiImageUrl(movie.poster_path, 'poster', 'w342')} 1x, ${Utilities.getApiImageUrl(movie.poster_path, 'poster', 'w500')} 2x`}
                    alt={movie.title}
                    className="image-section"
                    loading="lazy"
                    style={{
                        backgroundImage: `url(${Utilities.getApiImageUrl(movie.poster_path, 'poster', 'w92')})`
                    }}
                />
            </section>

            <section className="main-section">
                <div className="main-section-inner">
                    <section
                        className="movie-information-section ">
                        <Link to={`/movie/${movie.id}`}>
                            <h3 className="text-3xl mb-2 font-semibold" title={movie.title}>
                                {movie.title}
                            </h3>
                        </Link>
                    </section>

                    <section className="bottom-section ">
                        <p className="release-date">{Utilities.formatDate(movie.release_date)}</p>
                        {getRatingSection(movie)}
                        <section className="summary-section multiline-clamp">
                            {getSummarySection(movie)}
                        </section>
                        <Link className="primary-button action-button mt-2" to={`/movie/${movie.id}`}>
                            <FontAwesomeIcon icon={faPlay}/> Watch Now
                        </Link>
                    </section>
                </div>
            </section>
        </article>
    )
    //<hr className="bottom-accent mt-2"/>
}
export default MovieCard
