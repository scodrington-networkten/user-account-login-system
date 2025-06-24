import LoadingCard from "@components/loading-card.jsx";
import {useEffect, useState} from "react";
import MoviesList from "@components/movies-list.jsx";

import StandardLayout from "@components/Layouts/StandardLayout.jsx";

const PopularMovies = () => {

    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);


    /**
     * Fetch the latest movies upcoming
     */
    useEffect(() => {

        (async () => {

            try {
                setLoading(true);
                setError(false);

                const result = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-popular-movies',
                        'page': 1
                    }
                })
                if (!result.ok) {
                    const message = await result.text();
                    throw new Error(message);
                }

                //set latest from API
                const data = await result.json();
                setMovies(data.results);

            } catch (error) {
                setError(true);
                window.showToastNotification(error.message, 'error');
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const Render = () => {

        if (loading) {
            return (
                <LoadingCard/>
            )
        }

        if (error) {
            return (
                <p>There was an error retrieving movies</p>
            )
        }

        if (movies.length === 0) {
            return (
                <p>There are no popular movies to show!</p>
            )
        }

        return (
            <MoviesList
                movies={movies}
                showPagination={false}
                showHeader={false}
                totalPages={1}
            />
        )
    }

    //return the layout
    return (
        <StandardLayout title={"Popular Movies"}>
            {Render()}
        </StandardLayout>
    )

}
export default PopularMovies;
