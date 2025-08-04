import LoadingCard from "@components/loading-card";
import {JSX, useEffect, useState} from "react";
import MoviesList from "@components/movies-list";
import StandardLayout from "@components/Layouts/StandardLayout";
import {Helmet} from "react-helmet";
import Utilities from "../../utilities";
import {MovieResult} from "@contracts/movieResult";
import GenreList from "@components/genre-list";
import {useSearchParams} from "react-router-dom";
import {MovieApiResults} from "@contracts/MovieApiResults";

/**
 * Shows upcoming movies (mostly new releases)
 * @constructor
 */
const UpcomingMovies = (): JSX.Element => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [movies, setMovies] = useState<MovieResult[]>([]);

    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') ?? '1', 10) || 1;

    /**
     * Fetch the latest movies upcoming
     */
    useEffect(() => {

        (async () => {

            try {
                setMovies([])
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
                const data: MovieApiResults = await result.json();
                setMovies(data.results as MovieResult[]);
                setTotalPages(data.total_pages);
                setTotalResults(data.total_results);

            } catch (error) {
                setError(true);
                window.showToastNotification((error as Error).message, 'error');
            } finally {
                setLoading(false);
            }
        })();
    }, [searchParams, currentPage]);


    const onNextButton = () => {

        setSearchParams({
            page: String(currentPage + 1)
        })
    }

    const onPrevButton = () => {
        setSearchParams({
            page: String(currentPage - 1)
        })
    }

    const onPageButton = (page: number): void => {

        setSearchParams({
            page: String(page)
        });
    }

    const Render = () => {

        return (
            <>
                <Helmet>
                    <title>{Utilities.getSiteNameForPage('Upcoming')}</title>
                </Helmet>

                {error &&
                    <div className="container">
                        <p>There was an error collecting the list of upcoming movies</p>
                    </div>
                }

                <MoviesList
                    movies={movies}
                    onNextButton={onNextButton}
                    onPrevButton={onPrevButton}
                    onPagesButton={onPageButton}
                    loading={loading}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalResults={totalResults}
                    showHeader={false}
                />

            </>
        )


    }

    //return the layout
    return (
        <StandardLayout title={"Upcoming Movies"}>
            <GenreList/>
            {Render()}
        </StandardLayout>
    )

}
export default UpcomingMovies;
