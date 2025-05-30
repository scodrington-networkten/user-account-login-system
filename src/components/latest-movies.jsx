import {useState, useEffect} from "react";
import MoviesList from "./movies-list.jsx";
import CarouselCard from "./carousel-card.jsx";
import useEmblaCarousel from "embla-carousel-react";
import SampleData from "../sampleData.js";
import sampleData from "../sampleData.js";

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
            <section className="embla latest-movies-carousel" ref={emblaRef}>
                <div className="embla__container">
                    {movies.map((item, index) => {
                        return (
                            <div className="embla__slide" key={`carousel-${index}`}>
                                <CarouselCard movie={item}/>
                            </div>
                        )
                    })}
                </div>
                <button onClick={() => emblaApi?.scrollPrev()} className="embla__prev button">Prev</button>
                <button onClick={() => emblaApi?.scrollNext()} className="embla__next button">Next</button>
            </section>
        )
    }

    return (
        <div className="latest-movies">{getOutput()}</div>
    )
}
export default LatestMovies
