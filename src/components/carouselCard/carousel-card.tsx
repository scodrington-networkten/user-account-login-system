import _ from "lodash";
import {Link} from "react-router-dom";
import {faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useGenre} from "@contexts/GenreContext";
import React, {JSX} from "react";
import GenreButton from "@components/genre-button";

import './carousel-card.css';
import {Movie} from "@contracts/movie";
import {MovieResult} from "@contracts/movieResult";
import {useUser} from "@contexts/UserContext";

type CarouselCardProps = {
    movie: MovieResult
}
/**
 * Single card to be used in the large hero slider
 * @param movie
 * @constructor
 */
const CarouselCard = ({movie}: CarouselCardProps) => {

    const {genres} = useGenre();
    const {user, addWatchLater, removeWatchLater} = useUser();

    /**
     * Given an  ID (representing a genre id), return a button component with its correct name
     * @param id
     */
    const getGenreButton = (id: number): JSX.Element | null => {

        //find the associated genre given the id
        let genre = _.find(genres, (item) => {
            return item.id === id;
        })

        if (!genre) return null;

        //leverage the existing genre button to show these genres
        return (
            <GenreButton
                classes={'button button-small button-transparent'}
                genre={genre}
                isActive={false}
                key={`genre-button-${genre.id}`}
            />

        )
    }

    /**
     * Outputs the summary section for both mobile and desktop
     * @param movie
     */
    const getSummarySection = (movie: Movie | MovieResult): JSX.Element => {

        let mobileSummary = _.truncate(movie.overview, {length: 200});
        let longSummary = _.truncate(movie.overview, {length: 350});

        return (
            <>
                <div className="movie-summary movie-summary-short ">{mobileSummary}</div>
                <div className="movie-summary movie-summary-long ">{longSummary}</div>
            </>
        )
    }

    /**
     * Add to users watch later list
     * @param e
     */
    const onWatchlistAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {


        const result = await addWatchLater(movie.id);


    }

    return (
        <article className="carousel-card">
            <div className="background-hero-image-overlay"></div>
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="background-hero-image"
            ></div>
            <div
                className="main-container ">
                <section className="right">
                    <div className="image-section">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className=" rounded-lg h-full w-auto max-h-[300px] lg:max-h-[350px] xl:max-height-[400px]"
                        />
                    </div>
                </section>
                <section className="left">
                    <section className="primary">
                        <Link className="" to={`/movie/${movie.id}`}>
                            <h1 className="title">{movie.title}</h1>
                        </Link>
                        {getSummarySection(movie)}
                        <section className="genre-section">
                            <div className="button-list">
                                {movie.genre_ids.map((item, index) => (
                                    getGenreButton(item)
                                ))}
                            </div>
                        </section>

                        <div className="action-links">
                            <Link className="action-button watch-button" to={`/movie/${movie.id}`}>
                                <FontAwesomeIcon icon={faPlay}/><p>Watch Now</p>
                            </Link>

                            {(user !== null) &&
                                <button className="action-button add-to-list-button" onClick={onWatchlistAdd}>
                                    <FontAwesomeIcon icon={faPlus}/><p>Watchlist</p>
                                </button>
                            }
                        </div>

                    </section>
                </section>
            </div>
        </article>
    )
}
export default CarouselCard
