import LoadingCard from "@components/loading-card.tsx";
import {useEffect, useState} from "react";
import MoviesList from "@components/movies-list.jsx";

import StandardLayout from "@components/Layouts/StandardLayout.tsx";
import {Helmet} from "react-helmet";
import Utilities from "../../utilities";

const LatestMovies = () => {

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
                        'x-action': 'get-latest-movies',
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
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage('Latest')}</title>
                    </Helmet>
                    <LoadingCard/>
                </>

            )
        }

        if (error) {
            return (
                <p>There was an error retrieving movies</p>
            )
        }

        if (movies.length === 0) {
            return (
                <p>There are no latest movies to show!</p>
            )
        }

        return (
            <>
                <Helmet>
                    <title>{Utilities.getSiteNameForPage('Latest')}</title>
                </Helmet>
                <MoviesList
                    movies={movies}
                    showPagination={false}
                    showHeader={false}
                    totalPages={1}
                />
            </>

        )
    }

    //return the layout
    return (
        <StandardLayout title={"Latest Movies"}>
            {Render()}
        </StandardLayout>
    )

}
export default LatestMovies;
