import {JSX, useEffect, useState} from "react";
import StandardSlider from "@components/standardSlider/standardSlider";
import {Movie} from "@contracts/movie";

/**
 * Given a movie, find similar movies to this one for the user
 * @param movie
 * @returns {JSX.Element}
 * @constructor
 */
type SimilarMoviesProps = {
    movie: Movie
}
export default function SimilarMovies({movie}: SimilarMoviesProps): JSX.Element | null {

    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    //on start, get similar movies for this given movie
    useEffect(() => {

        (async () => {

            setLoading(true);
            const result = await fetch('/api/get', {
                method: 'GET',
                headers: {
                    'x-action': 'get-related-movies',
                    'movie-id': movie.id.toString()
                }
            });

            if (!result.status) {
                window.showToastNotification('There was an error fetching similar movies', 'error');
                return;
            }
            const data = await result.json();
            const movieSubset = (data.results.length > 0) ? data.results.splice(0, 10) : [];
            setLoading(false);
            setMovies(movieSubset);

        })()
    }, [movie]);

    if (movies.length === 0) return null;

    return (
        <section className="similar-movies mt-4">
            <StandardSlider data={movies} header={"You Might Also Like"}/>
        </section>

    )
}
