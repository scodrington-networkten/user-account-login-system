import GenreButton from "./genre-button.jsx";

const CarouselCard = ({movie}) => {
    return (
        <article className="carousel-card relative h-[250px] md:h-[450px] bg-gray-600 ">
            <div className="background-hero-image-overlay"></div>
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="background-hero-image absolute w-full h-full top-0 z-0"
            ></div>
            <div className="main-container container flex relative z-1 p-12 gap-10">
                <section className="right flex-grow-0 hidden md:block">
                    <div className="image-section shadow-xl">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className=" rounded-lg h-full w-auto max-h-[300px]"
                        />
                    </div>
                </section>
                <section className="left flex-grow-1 text-white md:max-w-[70%]">
                    <section className="primary flex flex-col justify-start flex-start items-start z-1">
                        <h1 className="font-bold md:text-6xl text-3xl mb-4">{movie.title}</h1>
                        <div className="overview md:mb-8 text-2xl text-lg items-start font-light">{movie.overview}</div>
                    </section>
                </section>
            </div>
        </article>
    )
}
export default CarouselCard
