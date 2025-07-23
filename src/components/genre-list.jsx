import React from "react";
import GenreButton from "./genre-button.jsx";

import {useContext} from "react";
import {GenreContext} from "../contexts/GenreContext.jsx";
import {useLocation} from "react-router-dom";

import useEmblaCarousel from "embla-carousel-react";

import slugify from "slugify";
import Utilities from "../utilities";

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
     * Horitzontal slider with embla
     * @returns {Element}
     */
    const getMobileGenreSlider = () => {

        return (
            <div className="embla overflow-hidden md:hidden" ref={emblaRef}>
                <div className="embla__container flex gap-2 genres genre-slider">
                    {genres?.map((item, index) => (
                        <div key={`genre-item-${index}`} className="embla__slide flex-none !basis-auto">
                            {Utilities.getGenreButton(item, `mobile-genre-button-${index}`)}
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
                <div className="hidden md:flex genres justify-center gap-2 flex-wrap md:justify-start">
                    {genres?.map((item, index) => (
                        Utilities.getGenreButton(item,  `genre-desktop-button-${index}` )
                    ))}
                </div>
            )
        } else {
            return <p>Loading Genres..</p>
        }
    }

    return (

        <div className="genre-container container m-auto">
            {getMobileGenreSlider()}
            {getDesktopGenres()}
        </div>

    )
}
export default GenreList;
