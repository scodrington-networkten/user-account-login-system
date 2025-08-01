import {useParams, useSearchParams} from "react-router-dom";
import MoviesList from "@components/movies-list";
import {JSX, useEffect, useState} from "react";
import LoadingCardList from "@components/loading-card-list";
import {Helmet} from "react-helmet";
import Utilities from "../utilities";
import {MovieResult} from "@contracts/movieResult";
import {Keyword} from "@contracts/keyword";

/**
 * Display movies associated with the provided keyword
 * @returns {JSX.Element}
 * @constructor
 */
const MoviesByKeyword = () : JSX.Element => {

    const {keyword: keywordString = ''} = useParams();
    const [movies, setMovies] = useState<MovieResult[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<Keyword | null>(null);

    //collect search data
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') ?? '1', 10) || 1;


    /**
     * Find the keyword via the API and then find associated movies with it
     */
    useEffect(() => {

        (async () => {

            try {
                setLoading(true);
                setError(false);

                //find the keyword from the API
                const keywordResult = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-keyword',
                        'keyword': keywordString
                    }
                })

                if (!keywordResult.ok) {
                    window.showToastNotification('There was an issue finding the keyword', 'error');
                    return;
                }

                const keywordData = await keywordResult.json();
                const matchedKeyword = keywordData?.results.length >= 1 ? keywordData.results[0] : null
                setKeyword(matchedKeyword);

                if (matchedKeyword === null) {
                    throw new Error('The keyword could not be found');
                }

                //collect movies for the given keyword
                const moviesRequest = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-movies-by-keyword',
                        'keyword-id': matchedKeyword.id.toString(),
                        'page': currentPage.toString()
                    }
                })

                if (!moviesRequest.ok) {
                    throw new Error('There was an issue fetching movies belonging to your keyword');
                }

                const movieData = await moviesRequest.json();
                setMovies(movieData.results);
                setTotalPages(movieData.total_pages);
            } catch (error) {
                setError(true);
                window.showToastNotification((error as Error).message, 'error');
                console.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        })();


    }, [searchParams, currentPage, keywordString]);


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

    const onPageButton = (page: number) : void => {

        setSearchParams({
            page: String(page)
        });
    }

    /**
     * Show either loading card template or movies if ready
     */
    const displayMovies = () : JSX.Element => {

        const keywordName = keyword ? keyword.name : '';

        if (loading) {
            return (
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage(keywordName)}</title>
                    </Helmet>
                    <div className="container">
                        <LoadingCardList/>
                    </div>
                </>
            )

        } else if (error) {
            return (
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage(keywordName)}</title>
                    </Helmet>
                    <div className="container">
                        <p>There was an error finding movies that match your selected keyword</p>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage(keywordName)}</title>
                    </Helmet>
                    <div className="container">
                        <p>These movies have been tagged under <strong>{keywordName}</strong></p>
                        <MoviesList
                            movies={movies}
                            onNextButton={onNextButton}
                            onPrevButton={onPrevButton}
                            onPagesButton={onPageButton}
                            loading={loading}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            showHeader={false}
                        />
                    </div>
                </>

            )
        }
    }

    return (
        <div className="movies-by-keyword">
            <h1 className="title">{Utilities.getProperCaseString(keywordString)}</h1>
            {displayMovies()}
        </div>

    )
}
export default MoviesByKeyword;
