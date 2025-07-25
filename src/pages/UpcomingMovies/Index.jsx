import LoadingCard from "@components/loading-card.tsx";
import {useEffect, useState} from "react";
import MoviesList from "@components/movies-list.jsx";
import StandardLayout from "@components/Layouts/StandardLayout.tsx";
import {Helmet} from "react-helmet";
import Utilities from "../../utilities";

/**
 * Shows upcoming movies (mostly new releases)
 * @returns {JSX.Element}
 * @constructor
 */
const UpcomingMovies = () => {


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
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
                setStartDate(data.dates.minimum);
                setEndDate(data.dates.maximum);

            } catch (error) {
                setError(true);
                window.showToastNotification(error.message, 'error');
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
