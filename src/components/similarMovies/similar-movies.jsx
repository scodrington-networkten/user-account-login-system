import {useEffect, useState} from "react";
import MoviesList from "@components/movies-list.jsx";
import StandardSlider from "@components/standardSlider/standardSlider.jsx";

/**
 * Given a movie, find similar movies to this one for the user
 * @param movie
 * @returns {JSX.Element}
 * @constructor
 */
export default function SimilarMovies({movie}) {

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
                    'movie-id': movie.id
                }
            });

            if (!result.status) {
                window.showToastNotification('There was an error fetching similar movies', 'error');
                return;
            }
            const data = await result.json();
            const movieSubset = (data.results.length > 0) ? data.results.splice(0, 4) : [];
            setLoading(false);
            setMovies(movieSubset);
            console.log(data);

        })()
    }, [movie]);

    if (movies.length === 0) return null;

    return (
        <section className="similar-movies mt-4">
            <StandardSlider data={movies} header={"You Might Also Like"}/>
        </section>

    )
}
