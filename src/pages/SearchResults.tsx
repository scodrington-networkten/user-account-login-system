import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MoviesList from "@components/movies-list";

import LoadingCardList from "@components/loading-card-list";
import {Helmet} from "react-helmet";
import Utilities from "../utilities";
import {MovieResult} from "@contracts/movieResult";


const SearchResults = () => {


    //search variables
    const [searchParams, setSearchParams] = useSearchParams();
    const q: string = searchParams.get("q") ?? '';
    const currentPage: number = parseInt(searchParams.get('page') ?? '1', 10) || 1;

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [movies, setMovies] = useState<MovieResult[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalResults, setTotalResults] = useState<number>(0);


    useEffect(() => {

        const getApiData = async () => {

            try {
                setLoading(true);
                setError(false);
                let response = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-search',
                        'q': q,
                        'page': currentPage.toString()
                    }
                });
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error);
                }

                const data = await response.json();

                setMovies(data.results);
                setTotalPages(data.total_pages);
                setTotalResults(data.total_results);


            } catch (error) {
                setError(true);
                console.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        }
        void getApiData();

    }, [searchParams])

    const onNextButton = () => {

        setSearchParams({
            q: q,
            page: String(currentPage + 1)
        })
    }

    const onPrevButton = () => {
        setSearchParams({
            q: q,
            page: String(currentPage - 1)
        })
    }

    const onPageButton = (page: number) => {

        setSearchParams({
            q: q,
            page: String(page)
        });
    }

    const displayMovieResults = () => {

        //show the loading list while we wait
        if (loading) {
            return (
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage(q)}</title>
                    </Helmet>
                    <LoadingCardList/>
                </>

            )
        } else if (error) {
            return (
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage(q)}</title>
                    </Helmet>
                    <p>There was an error generating search results</p>
                </>

            )
        }

        return (
            <>
                <Helmet>
                    <title>{Utilities.getSiteNameForPage(q)}</title>
                </Helmet>
                <div className="movie-results">
                    <MoviesList
                        movies={movies}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalResults={totalResults}
                        onPrevButton={onPrevButton}
                        onNextButton={onNextButton}
                        loading={loading}
                        onPagesButton={onPageButton}
                        searchQuery={q}
                    />
                </div>
            </>
        )

    }

    return (
        <div className="search-results">
            <h1>Search Results</h1>
            {displayMovieResults()}
        </div>
    )
}

export default SearchResults;
