import SampleData from "../../sampleData.js";
import {useCallback, useEffect, useState} from "react";
import MovieCard from "@components/movieCard/movie-card.jsx";

import useEmblaCarousel from "embla-carousel-react";

import './test.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";


const DynamicCarousel = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [movies, setMovies] = useState(null);

    //load movie data
    useEffect(() => {

        setMovies(SampleData.results.slice(6, 12));

    }, []);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true
        }
    )
    const prevButton = () => {

        emblaApi?.scrollPrev();
    }

    const nextButton = () => {

        emblaApi?.scrollNext();
    }

    const onCardSelect = (index) => {

        //dont scroll to self
        if (index === selectedIndex) return;
        emblaApi?.scrollTo(index);
    }

    const onSelect = () => {

        const index = emblaApi.selectedScrollSnap();
        setSelectedIndex(index);

        const slides = emblaApi.slideNodes()
        slides.forEach((item, i) => {

            if (index === i) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

    }


    useEffect(() => {
        if (!emblaApi) return;

        //scroll on start
        onSelect();
        emblaApi.on('select', onSelect);

        //set select index based on the carousel current number
        setSelectedIndex(emblaApi.selectedScrollSnap());

        //cleanup when finished
        return (() => {
            emblaApi.off('select', onSelect);
        })

    }, [emblaApi]);


    if (!movies) {
        return (
            <div className="container mx-auto py-4">Loading</div>
        )
    }

    return (
        <div className="container mx-auto py-4 overflow-hidden ">
            <div className="embla dynamic-width-carousel relative w-full" ref={emblaRef}>
                <div className="embla__container">
                    {movies.map((item, index) => {
                        return (
                            <div className="embla__slide">
                                <div className="embla__inner" key={index} onClick={() => onCardSelect(index)}>
                                    <MovieCard movie={item}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="embla__navigation-container">
                    <div onClick={prevButton}
                         className="embla__prev ">
                        <FontAwesomeIcon
                            icon={faAngleLeft}/></div>
                    <div onClick={nextButton}
                         className="embla__next ">
                        <FontAwesomeIcon
                            icon={faAngleRight}/></div>
                </div>
            </div>

            <p>current index: {emblaApi !== null ? selectedIndex : ''}</p>
        </div>
    )
}
export default DynamicCarousel
