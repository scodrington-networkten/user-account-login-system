import {useState, useEffect} from "react";
import MoviesList from "./movies-list.jsx";
import CarouselCard from "./carousel-card.jsx";
import useEmblaCarousel from "embla-carousel-react";

import sampleData from "../sampleData.js";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LatestMovies = () => {

    const [movies, setMovies] = useState([]);
    const [moviesLoading, setMoviesLoading] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [page, setPage] = useState(1);
    const [error, setError] = useState(false);

    const [emblaRef, emblaApi] = useEmblaCarousel({loop: false})

    useEffect(() => {

        //use temporary data for now!
        setMovies(sampleData.results);
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
            <section className="latest-movies-carousel container flex w-full mx-auto mb-10">
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
                    <div onClick={() => emblaApi?.scrollPrev()} className="embla__prev absolute left-4 top-1/2 -translate-y-1/2 text-4xl text-white"><FontAwesomeIcon
                        icon={faAngleLeft}/></div>
                    <div onClick={() => emblaApi?.scrollNext()} className="embla__next absolute right-4 top-1/2 -translate-y-1/2 text-4xl text-white"><FontAwesomeIcon
                        icon={faAngleRight}/></div>
                </div>
            </section>
        )
    }

    return (
        <div className="latest-movies  bg-gray-600">{getOutput()}</div>
    )
}
export default LatestMovies
