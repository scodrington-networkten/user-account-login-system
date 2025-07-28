import {useState, useEffect, useCallback, JSX} from "react";
import CarouselCard from "./carouselCard/carousel-card";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './latest-movies.css';

import _ from "lodash";
import {MovieResult} from "@contracts/movieResult";
import {MovieApiResults} from "@contracts/MovieApiResults";
import {Movie} from "@contracts/movie";

/**
 * Shows a featured movies carousel hero component
 * @constructor
 */
const FeaturedMoviesCarousel = (): JSX.Element => {

    const [movies, setMovies] = useState<MovieResult[]>([]);
    const [moviesLoading, setMoviesLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    //slider elements here
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {loop: true},
        [Autoplay({
            delay: 3000,
            stopOnInteraction: true
        })]
    )
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<Number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    /**
     * Scroll to the given index
     */
    const scrollTo = useCallback((index: number): void => {

        if (!emblaApi) return;
        emblaApi.scrollTo(index);
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return;

        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        onSelect(); // Set initial selected dot
    }, [emblaApi, onSelect]);


    useEffect(() => {

        //Connect to the API to pull in data
        const callApi = async () => {

            try {
                setError(false);
                setMoviesLoading(true);
                const request = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-now-playing-movies'
                    }
                });
                if (!request.ok) {
                    throw new Error("Could not connect to the feed of now playing movies")
                } else {
                    const data: MovieApiResults = await request.json();
                    const subset = _.take(data.results as MovieResult[], 5);
                    setMovies(subset);
                }
            } catch (error) {
                setError(true);
                window.showToastNotification((error as Error).message, 'error');
            } finally {
                setMoviesLoading(false);
            }
        }
        void callApi();

    }, []);


    const getOutput = () => {

        if (error) {
            return <p>There was an error</p>
        }

        if (moviesLoading) {
            return (
                <section className="aspect-[16/9] bg-gray-800"></section>
            )
        }
        return (
            <section className="latest-movies-carousel flex w-full ">
                <div className="embla relative w-full" ref={emblaRef}>
                    <div className="embla__container relative">
                        {movies.map((item, index) => {
                            return (
                                <div className="embla__slide" key={`carousel-${index}`}>
                                    <CarouselCard movie={item}/>
                                </div>
                            )
                        })}
                    </div>
                    <div className="embla__next-prev container">
                        <div onClick={() => emblaApi?.scrollPrev()}
                             className="embla__prev ">
                            <FontAwesomeIcon
                                icon={faAngleLeft}/></div>
                        <div onClick={() => emblaApi?.scrollNext()}
                             className="embla__next ">
                            <FontAwesomeIcon
                                icon={faAngleRight}/></div>
                    </div>
                    <div className="embla__navigation-container">
                        <div className="embla__dots">
                            <div className="embla__dots_inner">
                                {scrollSnaps.map((item, index) => (
                                    <button
                                        key={index}
                                        className={`embla__dot ${index === selectedIndex ? 'is-selected' : ''}`}
                                        onClick={() => scrollTo(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        )
    }

    return (
        <div className="latest-movies max-w-full w-full">{getOutput()}</div>
    )
}
export default FeaturedMoviesCarousel
