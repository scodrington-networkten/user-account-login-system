import {JSX, useEffect, useState} from "react";
import StandardSlider from "@components/standardSlider/standardSlider";
import {MovieResult} from "@contracts/movieResult";

type SinglePersonMoviesProps = {
    movies: {
        cast: MovieResult[],
        crew: MovieResult[]
    }
}
const SinglePersonMovies = ({movies}: SinglePersonMoviesProps): JSX.Element | null => {

    const [recentMoves, setRecentMovies] = useState<MovieResult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
        return null;
    }

    return (
        <section className="movies">
            <StandardSlider data={recentMoves} header={"Recent Movies"}/>
        </section>

    )
}
export default SinglePersonMovies;
