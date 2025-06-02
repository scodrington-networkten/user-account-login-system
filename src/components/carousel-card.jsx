import GenreButton from "./genre-button.jsx";
import {Link} from "react-router-dom";

import {faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './carousel-card.css';

const CarouselCard = ({movie}) => {
    return (
        <article className="carousel-card relative h-[250px] md:h-[450px] lg:h-[600px] bg-gray-600">
            <div className="background-hero-image-overlay"></div>
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="background-hero-image absolute w-full h-full top-0 z-0"
            ></div>
            <div className="main-container m-auto container flex relative z-1 p-16 gap-10">
                <section className="right mt-10 flex-grow-0 hidden md:block">
                    <div className="image-section shadow-xl">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className=" rounded-lg h-full w-auto max-h-[300px]"
                        />
                    </div>
                </section>
                <section className="left mt-10 flex-grow-1 text-white md:max-w-[70%]">
                    <section className="primary flex flex-col justify-start flex-start items-start z-1">
                        <h1 className="font-bold md:text-6xl text-3xl mb-4">{movie.title}</h1>
                        <div className="overview md:mb-8 text-2xl text-lg items-start font-light">{movie.overview}</div>

                        <div className="flex gap-2">
                            <Link className="action-button watch-button" to={`/movie/${movie.id}`}>
                                <FontAwesomeIcon icon={faPlay}/><p>Watch Now</p>
                            </Link>
                            <Link className="action-button add-to-list-button" to={`/movie/${movie.id}`}>
                                <FontAwesomeIcon icon={faPlus}/><p>Watchlist</p>
                            </Link>

                        </div>

                    </section>
                </section>
            </div>
        </article>
    )
}
export default CarouselCard
