
import '../assets/scss/movie.scss';
const MovieCard = ({movie}) => {

    return (
        <article className="movie-card flex relative" >

            <section className="image-section">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover"
                    />
            </section>
            <section className="main-section flex flex-col h-full w-full absolute bg-black text-white opacity-50 hover:opacity-80 transition-opacity">
                <div className="flex flex-col flex-grow justify-between px-4 py-4 box-content leading-tight">
                    <section className="movie-information-section">
                        <h3 className="truncate text-2xl mb-2" title={movie.title}>
                            {movie.title}
                        </h3>
                        <p className="release-date">{movie.release_date}</p>
                        <section className="rating-information">
                            <span className="average">Average {movie.vote_average}</span>
                            <span className="vote-count">Count{movie.vote_count}</span>
                        </section>
                    </section>
                    <section className="summary-section multiline-clamp">
                        <p className="summary text-base">{movie.overview}</p>
                    </section>

                    <section className="genre-section hidden">
                        {movie.genre_ids.map((item, index) => {
                            return <p key={index}>{item}</p>
                        })}
                    </section>
                </div>

            </section>



        </article>
    )
}
export default MovieCard
