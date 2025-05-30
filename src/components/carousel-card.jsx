import GenreButton from "./genre-button.jsx";

const CarouselCard = ({movie}) => {
    return (
        <article className="carousel-card min-h-[400px] bg-gray-600">
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="absolute w-full h-full top-0 z-0 opacity-10"
            ></div>
            <div className="main-container flex relative z-1 p-12 gap-10">
                <section className="right flex-grow-0">
                    <div className="image-section shadow-xl">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className=" rounded-lg w-[250px] max-w-none"
                        />
                    </div>
                </section>
                <section className="left flex-grow-1 text-white max-w-[50%]">
                    <section className="primary flex flex-col justify-start flex-start items-start z-1">
                        <h1 className="font-bold text-4xl mb-8">{movie.title}</h1>
                        <div className="overview mb-8 text-1xl items-start font-light">{movie.overview}</div>
                    </section>
                </section>

            </div>
        </article>
    )
}
export default CarouselCard
