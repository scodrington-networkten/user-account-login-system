import {useState, useEffect, useCallback} from "react";
import CarouselCard from "./carouselCard/carousel-card.jsx";
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
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [page, setPage] = useState(1);
    const [error, setError] = useState(false);

    //slider elements here
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true})
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    const scrollTo = useCallback((index) => {
        if (!emblaApi) return;
        emblaApi.scrollTo(index);
    })

    useEffect(() => {
        if (!emblaApi) return;

        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        onSelect(); // Set initial selected dot
    }, [emblaApi, onSelect]);


    useEffect(() => {


        let smallData = _.take(sampleData.results, 5);
        //use temporary data for now!
        setMovies(smallData);
        setStartDate(sampleData.dates.minimum);
        setEndDate(sampleData.dates.maximum);
        setPage(sampleData.page);

        return;

        //Connect to the API to pull in data
        const callApi = async () => {

            setMoviesLoading(true);

            const request = await fetch('/api/get-current-movies');
            if (!request.ok) {

            } else {
                const json = await request.json();

                setMovies(json.data.results);
                setStartDate(json.data.dates.minimum);
                setEndDate(json.data.dates.maximum);
                setPage(json.data.page);

            }
            setMoviesLoading(false);
        }
        callApi();

    }, []);

    const getLatestMoviesData = () => {

    }

    const getOutput = () => {

        if (error) {
            return <p>There was an error</p>
        }

        if (moviesLoading) {
            return <p>Loading in content</p>
        }
        return (
            <section className="latest-movies-carousel flex w-full mx-auto -mt-[60px]">
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
            </section>
        )
    }

    return (
        <div className="latest-movies  bg-gray-600">{getOutput()}</div>
    )
}
export default LatestMovies
