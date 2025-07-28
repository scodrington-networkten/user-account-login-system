import {useEffect, useRef, useState} from "react";
import MovieCard from "@components/movieCard/movie-card";
import useEmblaCarousel from "embla-carousel-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import './dynamic-carousel.css';
import {MovieResult} from "@contracts/movieResult";


/**
 * Dynamic carousel, used to show a single card in focus
 * @returns {JSX.Element}
 * @constructor
 */
type DynamicCarouselProps = {
    movies: MovieResult[]
}
const DynamicCarousel = ({movies}: DynamicCarouselProps) => {

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const isDragging = useRef(false);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            duration: 5,
            slides: '.embla__slide'
        }
    )

    const prevButton = (): void => {
        emblaApi?.scrollPrev();
    }

    const nextButton = (): void => {
        emblaApi?.scrollNext();
    }

    /**
     * On select
     * @param index
     */
    const onSelect = (index: number): void => {

        if (!emblaApi) return;
        //dont scroll to self
        if (index === selectedIndex) return;
        emblaApi?.scrollTo(index);
    }

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on('pointerDown', () => {
            isDragging.current = false;
        });

        emblaApi.on('pointerUp', () => {
            setTimeout(() => {
                isDragging.current = false;
            }, 0);
        });

        //collect scroll snaps
        setScrollSnaps(emblaApi.scrollSnapList());

        console.log(emblaApi.scrollSnapList());

        //scroll on start
        const onCarouselSelect = () => {

            const index = emblaApi.selectedScrollSnap();
            setSelectedIndex(index);

            const slides: HTMLElement[] = emblaApi.slideNodes()
            slides.forEach((item, i) => {

                //get current slide so we can adjust classes on article
                const currentSlide = slides[i];
                const article = currentSlide.querySelector('article');
                if (!article) return;

                //active element
                if (index === i) {
                    item.classList.add("active");
                    article.classList.add("touched");

                } else {
                    item.classList.remove("active");
                    article.classList.remove("touched");
                }
            });

        }
        onCarouselSelect();
        emblaApi.on('select', onCarouselSelect);

        //set select index based on the carousel current number
        setSelectedIndex(emblaApi.selectedScrollSnap());

        //cleanup when finished
        return (() => {
            emblaApi.off('select', onCarouselSelect);
        })

    }, [emblaApi]);


    if (!movies) {
        return (
            <div className="container mx-auto py-4">Loading</div>
        )
    }

    return (
        <div className="container mx-auto py-8 overflow-hidden ">
            <p>content before</p>
            <div className="embla dynamic-width-carousel relative w-full" ref={emblaRef}>
                <div className="embla__container">
                    <div className="flex">
                        {movies.map((item, index) => {
                            return (
                                <div className="embla__slide" key={`slider-${index}`}>
                                    <div className="embla__inner" onClick={() => {
                                        if (isDragging.current) return;
                                        onSelect(index)
                                    }}>
                                        <MovieCard movie={item}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="gradient-left"></div>
                <div className="gradient-right"></div>
                <div className="embla__next-prev">
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
            </div>
            <div className="embla__dots">
                <div className="embla__dots_inner">
                    {scrollSnaps.map((item, index) => (
                        <button
                            key={index}
                            className={`embla__dot ${index === selectedIndex ? 'is-selected' : ''}`}
                            onClick={() => {
                                if (isDragging.current) return;
                                onSelect(index)
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default DynamicCarousel
