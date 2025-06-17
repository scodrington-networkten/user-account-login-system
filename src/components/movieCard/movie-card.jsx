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
import {useEffect, useState, useRef} from "react";

const MovieCard = ({movie}) => {

    const cardRef = useRef(null);
    const utilities = new Utilities();
    const [touched, setTouched] = useState(false);
    const {user} = useUser();

    const [isFavorited, setIsFavorited] = useState(null);

    //determine if this movie is a users fav
    useEffect(() => {

        if(user === null) return;

        //determine if currently favorite
        const isFavorite = user.favorite_movies.some(item => {
            return item.movie_id === movie.id;
        });

        setIsFavorited(isFavorite);

    }, [user]);

    // When user touches inside the card
    const handleTouchStartInside = () => {
        setTouched(true);
    };

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
            <section className="rating-information flex gap-2 mb-3 justify-between">
                {utilities.getStarsSection(movie.vote_average)}
                {utilities.getVotesSection(10)}
                <div className="flex flex-1 justify-end">
                    <FavoriteMovieButton movie={movie} isFavorited={isFavorited}/>
                </div>
            </section>
        )
    }


    const getSummarySection = (movie) => {
        return (
            <p className="summary text-base">{utilities.getTrimmedString(movie.overview, 150)}</p>
        )
    }

    const getFavoritedBadge = (movie) => {

        if(!isFavorited) return;

        return (
            <div className="favorite-badge">
                <FontAwesomeIcon icon={faBookmarkFull}/>
                <p>Favorite</p>
            </div>
        )
    }
    return (
        <article
            className={`movie-card group ${touched ? 'touched' : ''}`}
            onTouchStart={handleTouchStartInside}
            ref={cardRef}
        >
            {getFavoritedBadge()}
            <section className="overflow-hidden w-full">
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

                    <section className="bottom-section ">
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
