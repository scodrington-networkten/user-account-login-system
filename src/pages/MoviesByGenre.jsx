import {useParams, useSearchParams} from "react-router-dom";
import GenreList from "@components/genre-list.tsx";
import MoviesList from "../components/movies-list.jsx";
import {useEffect, useState} from "react";
import _ from 'lodash';
import slugify from "slugify";
import LoadingCardList from "../components/loading-card-list.jsx";
import Utilities from "../utilities";
import {Helmet} from "react-helmet";

const MoviesByGenre = () => {

    //extract genre token from the url
    const {genre} = useParams();
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    //collect search data
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') ?? '1', 10) || 1;


    /**
     * When genre changes, ensure movies are reset
     */
    useEffect(() => {
        setMovies([]);
        setLoading(true);
    }, [genre])


    /**
     * Given the genre name (from the url), determine the ID of the genre and then do a search on that
     * genre to find movies that match that genre
     */
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(false);
                // Fetch genre data
                const result = await fetch('/api/get', {
                    headers: {'x-action': 'get-genres'}
                });
                const json = await result.json();
                let allGenres = json.genres;

                let matchedGenre = _.find(allGenres, (item) => {
                    let slugifyName = slugify(item.name, {lower: true});
                    return slugifyName === genre;
                });

                if (!matchedGenre) {
                    throw new Error(`A genre called ${genre} could not be found`);
                }


                // Now fetch movies using the matchedGenre.id directly
                const moviesResult = await fetch('/api/get', {
                    headers: {
                        'genre-id': matchedGenre.id,
                        'page': currentPage,
                        'x-action': 'get-movies-by-genre'
                    }
                });

                if (!moviesResult.ok) {
                    const data = await moviesResult.json();
                    throw new Error(data.error);
                }

                const data = await moviesResult.json();
                setMovies(data.results);
                setTotalPages(data.total_pages);

            } catch (error) {
                window.showToastNotification(error.message, 'error');
            } finally {
                setLoading(false);
                setError(false);
            }
        })();
    }, [genre, searchParams]);


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

        if (loading) {
            return (
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage(genre)}</title>
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
                        <title>{Utilities.getSiteNameForPage(genre)}</title>
                    </Helmet>
                    <div className="container">
                        <p>There was an issue loading movies for <b>{genre}</b></p>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage(genre)}</title>
                    </Helmet>
                    <div className="container">
                        <MoviesList
                            movies={movies}
                            onNextButton={onNextButton}
                            onPrevButton={onPrevButton}
                            onPagesButton={onPageButton}
                            moviesLoading={loading}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            showHeader={true}
                        />
                    </div>
                </>

            )
        }
    }

    return (
        <div className="container m-auto gap-2 flex flex-col p-4">
            <h1 className="text-4xl py-4">{Utilities.getProperCaseString(genre)}</h1>
            <GenreList/>
            {displayMovies()}
        </div>

    )
}
export default MoviesByGenre;
