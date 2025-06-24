import MovieCard from "@components/movieCard/movie-card.jsx";
import {useEffect, useState} from "react";

const SinglePersonMovies = ({movies = []}) => {

    const [recentMoves, setRecentMovies] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setRecentMovies(movies?.cast.length > 0 ? movies.cast.slice(0, 12) : []);
        setLoading(false);
    }, [movies]);

    if (loading) {
        return;
    }

    return (
        <section className="movies">
            <h2 className="text-3xl font-light mt-4">Recent Movies</h2>
            <section className="recent-movies mt-4 gap-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {recentMoves.map((item, index) => {
                    return <MovieCard key={`movie-${index}`} movie={item}/>
                })}
            </section>
        </section>

    )
}
export default SinglePersonMovies;
