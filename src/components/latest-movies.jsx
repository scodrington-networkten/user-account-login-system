import {useState, useEffect, useCallback} from "react";
import CarouselCard from "./carouselCard/carousel-card.jsx";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import sampleData from "../sampleData.js";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './latest-movies.css';

import _ from "lodash";

const LatestMovies = () => {

    const [movies, setMovies] = useState([]);
    const [moviesLoading, setMoviesLoading] = useState(false);
    const [error, setError] = useState(false);

    //slider elements here
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {loop: true},
        [Autoplay({
            delay: 10000,
            stopOnInteraction: true
        })]
    )
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    /**
     * Scroll to the given index
     * @type {(function(*): void)|*}
     */
    const scrollTo = useCallback((index) => {

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
                setMoviesLoading(true);
                const request = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-now-playing-movies'
                    }
                });
                if (!request.ok) {
                    throw new Error("Could not connect to the feed of now playing movies")
                } else {
                    const data = await request.json();
                    const subset = _.take(data.results, 5);
                    setMovies(subset);
                }
            } catch (error) {
                window.showToastNotification(error.message);
            } finally {
                setMoviesLoading(false);
            }
        }
        callApi();

    }, []);


    const getOutput = () => {

        if (error) {
            return <p>There was an error</p>
        }

        if (moviesLoading) {
            return <p>Loading in content</p>
        }
        return (
            <section className="latest-movies-carousel flex w-full  -mt-[60px]">
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
                    <div className="embla__navigation-container">
                        <div onClick={() => emblaApi?.scrollPrev()}
                             className="embla__prev ">
                            <FontAwesomeIcon
                                icon={faAngleLeft}/></div>
                        <div onClick={() => emblaApi?.scrollNext()}
                             className="embla__next ">
                            <FontAwesomeIcon
                                icon={faAngleRight}/></div>
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
        <div className="latest-movies max-w-full bg-gray-600">{getOutput()}</div>
    )
}
export default LatestMovies
