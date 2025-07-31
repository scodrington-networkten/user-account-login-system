import {Link} from "react-router-dom";
import Utilities from "../../utilities";
import {useUser} from "@contexts/UserContext";
import './movie-card.css';
import FavoriteMovieButton from "@components/favoriteMovieButton/favoriteMovieButton";
import {faBookmark as faBookmarkFull} from "@fortawesome/free-solid-svg-icons";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState, useRef, JSX, TouchEvent} from "react";
import {MovieResult} from "@contracts/movieResult";
import {Movie} from "@contracts/movie";


type MovieCardProps = {
    movie: MovieResult|Movie,
    classes?: string
}
const MovieCard = ({movie, classes = 'movie-card'}: MovieCardProps): JSX.Element => {

    const cardRef = useRef<HTMLElement | null>(null);
    const [touched, setTouched] = useState<boolean>(false);
    const {user} = useUser();

    const [isFavorited, setIsFavorited] = useState<boolean>(false);

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
        const handleTouchOutside = (e: Event) => {
            const target = e.target as Node | null;
            if (cardRef.current && target && !cardRef.current.contains(target)) {
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
     */
    const getRatingSection = (movie: MovieResult|Movie): JSX.Element => {

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


    const getSummarySection = (movie: MovieResult|Movie): JSX.Element => {
        return (
            <p className="summary ">{Utilities.getTrimmedString(movie.overview, 150)}</p>
        )
    }

    const getFavoritedBadge = (): JSX.Element | null => {

        if (!isFavorited) return null;

        return (
            <div className="favorite-badge">
                <FontAwesomeIcon icon={faBookmarkFull}/>
            </div>
        )
    }


    return (
        <article
            tabIndex={0}
            onFocus={() => setTouched(true)}
            onBlur={() => setTouched(false)}
            className={` group ${touched ? 'touched' : ''} ${classes}`}
            onTouchStart={() => setTouched(true)}
            ref={cardRef}
        >
            {getFavoritedBadge()}
            <section className="image-container overflow-hidden w-full aspect-[2/3]">
                <img
                    src={Utilities.getApiImageUrl(movie.poster_path, {type: 'poster', size: 'w342'})}
                    srcSet={`${Utilities.getApiImageUrl(movie.poster_path, {
                        type: 'poster',
                        size: 'w342'
                    })} 1x, ${Utilities.getApiImageUrl(movie.poster_path, {type: 'poster', size: 'w500'})} 2x`}
                    alt={movie.title}
                    className="image-section"
                    loading="lazy"
                    style={{
                        backgroundImage: `url(${Utilities.getApiImageUrl(movie.poster_path, {
                            type: 'poster',
                            size: 'w92'
                        })})`
                    }}
                />
            </section>

            <section className="main-section">
                <div className="main-section-inner">
                    <section
                        className="movie-information-section ">
                        <Link to={`/movie/${movie.id}`}>
                            <h3 className="title" title={movie.title}>
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
