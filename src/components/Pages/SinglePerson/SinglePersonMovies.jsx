import MovieCard from "@components/movieCard/movie-card.jsx";
import {useEffect, useState} from "react";
import StandardSlider from "@components/standardSlider/standardSlider.jsx";

const SinglePersonMovies = ({movies = []}) => {

    const [recentMoves, setRecentMovies] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        //sort the cast movies by date published (so we get good entries first)
        if (movies.cast.length > 0) {
            movies.cast.sort((a, b) => {
                return b.release_date.localeCompare(a.release_date);
            })
        }

        setRecentMovies(movies?.cast.length > 0 ? movies.cast.slice(0, 12) : []);
        setLoading(false);
    }, [movies]);

    if (loading) {
        return;
    }

    return (
        <section className="movies">
            <StandardSlider data={recentMoves} header={"Recent Movies"}/>
        </section>

    )
}
export default SinglePersonMovies;
