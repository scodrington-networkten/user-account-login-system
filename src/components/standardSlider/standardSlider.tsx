import {useCallback, useEffect, useState, useRef, JSX} from "react";
import MovieCard from "@components/movieCard/movie-card";
import './standard-slider.css';
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {MovieResult} from "@contracts/movieResult";

type StandardSlider = {
    data: MovieResult[],
    header: string
}
const StandardSlider = ({data, header = ''}: StandardSlider): JSX.Element => {

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    //slider elements here
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            duration: 5,
            slides: '.embla__slide'
        },
        [Autoplay({
            delay: 3000,
            stopOnInteraction: true
        })]
    )

    const containerRef = useRef<HTMLDivElement | null>(null);

    const prevButton = () => {
        emblaApi?.scrollPrev();
    }

    const nextButton = () => {
        emblaApi?.scrollNext();
    }

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);


    //Set up the slider
    useEffect(() => {
        if (!emblaApi) return;

        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        onSelect(); // Set initial selected dot

        //create a resize observer to re-init the slider when dimensions change (after images loaded)
        if (containerRef.current) {
            const resizeObserver = new ResizeObserver(() => {
                emblaApi.reInit();
                setScrollSnaps(emblaApi.scrollSnapList());
            });
            resizeObserver.observe(containerRef.current);

            return () => {
                resizeObserver.disconnect();
            }
        }
    }, [emblaApi, onSelect]);


    if (data.length === 0) {
        return (
            <div className="container mx-auto">Loading</div>
        )
    }

    const getOutput = (): JSX.Element => {

        return (
            <section className="standard-slider ">
                <h2 className="slider-header">{header}</h2>

                <div className="embla relative w-full" ref={(el) => {
                    emblaRef(el);
                    containerRef.current = el;
                }}>
                    <div className="embla__container">
                        {data.map((item, index) => {
                            return (
                                <div className="embla__slide" key={`carousel-${index}`}>
                                    <div className="embla__inner">
                                        <MovieCard movie={item} key={index}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="gradient-left"></div>
                    <div className="gradient-right"></div>
                    <div className="embla__next-prev">
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

                {emblaApi &&
                    <div className="embla__dots">
                        <div className="embla__dots_inner">
                            {scrollSnaps.map((item, index) => (
                                <button
                                    key={index}
                                    className={`embla__dot ${index === selectedIndex ? 'is-selected' : ''}`}
                                    onClick={() => emblaApi.scrollTo(index)}
                                />
                            ))}
                        </div>
                    </div>
                }
            </section>
        )
    }

    return (
        getOutput()
    )

}
export default StandardSlider;
