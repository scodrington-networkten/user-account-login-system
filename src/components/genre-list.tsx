import React, {JSX} from "react";
import {useGenre} from "@contexts/GenreContext";
import useEmblaCarousel from "embla-carousel-react";
import Utilities from "../utilities";
import {Genre} from "@contracts/genre";

/**
 * Shows a list of genres, used for users to select a genre to see movies
 */
const GenreList = () => {

    const {genres} = useGenre() as { genres: Genre[] };
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: false,
            align: 'start',
            containScroll: 'trimSnaps',
            dragFree: true
        }
    );


    /**
     * Horizontal slider with embla
     * @returns {Element}
     */
    const getMobileGenreSlider = (): JSX.Element => {

        return (
            <div className="embla overflow-hidden md:hidden" ref={emblaRef}>
                <div className="embla__container flex gap-2 genres genre-slider">
                    {genres?.map((item, index): JSX.Element => (
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
                        Utilities.getGenreButton(item, `genre-desktop-button-${index}`)
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
