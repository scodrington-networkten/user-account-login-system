import {useParams, useSearchParams} from "react-router-dom";
import MoviesList from "../components/movies-list.jsx";
import {useEffect, useState} from "react";
import LoadingCardList from "../components/loading-card-list.jsx";
import {Helmet} from "react-helmet";
import Utilities from "../utilities.jsx";

/**
 * Display movies associated with the provided keyword
 * @returns {JSX.Element}
 * @constructor
 */
const MoviesByKeyword = () => {

    const {keyword: keywordString} = useParams();
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState(null);

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
                        'keyword-id': matchedKeyword.id,
                        'page': currentPage
                    }
                })

                if (!moviesRequest.ok) {
                    throw new Error('There was an issue fetching movies belonging to your keyword');
                }

                const movieData = await moviesRequest.json();
                setMovies(movieData.results);
                setTotalPages(movieData.total_pages);
            } catch (error) {
                window.showToastNotification(error.message, 'error');
                console.error(error.message);
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

    const onPageButton = (page) => {

        setSearchParams({
            page: String(page)
        });
    }

    /**
     * Show either loading card template or movies if ready
     * @returns {JSX.Element}
     */
    const displayMovies = () => {

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
                            moviesLoading={loading}
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
        <div className="container m-auto gap-2 flex flex-col p-4">
            <h1 className="text-4xl py-4">Movies - {keywordString}</h1>
            {displayMovies()}
        </div>

    )
}
export default MoviesByKeyword;
