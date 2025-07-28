import LoadingCard from "@components/loading-card";
import {JSX, useEffect, useState} from "react";
import MoviesList from "@components/movies-list";

import StandardLayout from "@components/Layouts/StandardLayout";
import {Helmet} from "react-helmet";
import Utilities from "../../utilities";
import {MovieResult} from "@contracts/movieResult";
import {MovieApiResults} from "@contracts/MovieApiResults";

const PopularMovies = (): JSX.Element => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [movies, setMovies] = useState<MovieResult[]>([]);


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
                        'page': '1'
                    }
                })
                if (!result.ok) {
                    const message = await result.text();
                    throw new Error(message);
                }

                //set latest from API
                const data: MovieApiResults = await result.json();
                setMovies(data.results as MovieResult[]);

            } catch (error) {
                setError(true);
                window.showToastNotification((error as Error).message, 'error');
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const Render = (): JSX.Element => {

        if (loading) {
            return (
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage('Popular')}</title>
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
                <p>There are no popular movies to show!</p>
            )
        }

        return (
            <>
                <Helmet>
                    <title>{Utilities.getSiteNameForPage('Popular')}</title>
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
        <StandardLayout title={"Popular Movies"}>
            {Render()}
        </StandardLayout>
    )

}
export default PopularMovies;
