import LoadingCard from "@components/loading-card";
import {JSX, useEffect, useState} from "react";
import MoviesList from "@components/movies-list";
import StandardLayout from "@components/Layouts/StandardLayout";
import {Helmet} from "react-helmet";
import Utilities from "../../utilities";
import {MovieResult} from "@contracts/movieResult";

/**
 * Shows upcoming movies (mostly new releases)
 * @constructor
 */
const UpcomingMovies = (): JSX.Element => {

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
                        'x-action': 'get-upcoming-movies'
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
                window.showToastNotification((error as Error).message, 'error');
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
                        <title>{Utilities.getSiteNameForPage('Upcoming')}</title>
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
                <p>There are no upcoming movies to show!</p>
            )
        }

        return (
            <>
                <Helmet>
                    <title>{Utilities.getSiteNameForPage('Upcoming')}</title>
                </Helmet>
                <MoviesList
                    movies={movies}
                    showPagination={false}
                    showHeader={false} totalPages={1}
                />
            </>

        )
    }

    //return the layout
    return (
        <StandardLayout title={"Upcoming Movies"}>
            {Render()}
        </StandardLayout>
    )

}
export default UpcomingMovies;
