import React from "react";
import GenreButton from "./genre-button.jsx";

import {useContext} from "react";
import {GenreContext} from "../contexts/GenreContext.jsx";
import {useLocation} from "react-router-dom";

import useEmblaCarousel from "embla-carousel-react";

import slugify from "slugify";

/**
 * Shows a list of genres, used for users to select a genre to see movies
 *
 * @returns {JSX.Element}
 * @constructor
 */
const GenreList = () => {

    const {genres} = useContext(GenreContext);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: false,
            align: 'start',
            containScroll: 'trimSnaps',
            dragFree: true
        }
    );


    /**
     * Output the genre button, factoring in the URL to determine if this genre is currently active
     * @param genre
     * @param index
     * @returns {Element}
     */
    const getGenreButton = (genre, index) => {

        const location = useLocation();
        const pathSegments = location.pathname.split("/").filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];

        let slugifiedGenre = slugify(genre.name, {lower: true});
        let isActive = (lastSegment === slugifiedGenre);

        return <GenreButton key={index} genre={genre} isActive={isActive}/>
    }


    /**
     * Horitzontal slider with embla
     * @returns {Element}
     */
    const getMobileGenreSlider = () => {

        return (
            <div className="embla overflow-hidden md:hidden" ref={emblaRef}>
                <div className="embla__container flex gap-2 genres genre-slider">
                    {genres?.map((item, index) => (
                        <div key={`genre-item-${index}`} className="embla__slide flex-none !basis-auto">
                            {getGenreButton(item, index)}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    /**
     * Desktop genre items, in a flex wrapped listing
     * @returns {Element}
     */
    const getDesktopGenres = () => {

        if (genres !== null) {
            return (
                <div className="hidden md:flex genres justify-center gap-2 flex-wrap">
                    {genres?.map((item, index) => (
                        getGenreButton(item, index)
                    ))}
                </div>
            )
        } else {
            return <p>Loading Genres..</p>
        }
    }

    return (

        <div className="genre-container">
            {getMobileGenreSlider()}
            {getDesktopGenres()}
        </div>

    )
}
export default GenreList;
