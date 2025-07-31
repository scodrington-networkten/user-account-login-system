import {useParams, useSearchParams} from "react-router-dom";
import GenreList from "@components/genre-list";
import MoviesList from "@components/movies-list";
import {JSX, useEffect, useState} from "react";
import _ from 'lodash';
import slugify from "slugify";
import LoadingCardList from "@components/loading-card-list";
import Utilities from "../utilities";
import {Helmet} from "react-helmet";
import {Genre} from "@contracts/genre";
import {Movie} from "@contracts/movie";
import {MovieResult} from "@contracts/movieResult";
import {MovieApiResults} from "@contracts/MovieApiResults";

const MoviesByGenre = () => {

    //extract genre token from the url
    const {genre = ''} = useParams<string>();
    const [movies, setMovies] = useState<Movie[] | MovieResult[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

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
                let allGenres: Genre[] = json.genres;

                let matchedGenre: Genre | undefined = _.find(allGenres, (item) => {
                    let slugifyName = slugify(item.name, {lower: true});
                    return slugifyName === genre;
                });

                if (!matchedGenre) {
                    throw new Error(`A genre called ${genre} could not be found`);
                }

                // Now fetch movies using the matchedGenre.id directly
                const moviesResult = await fetch('/api/get', {
                    headers: {
                        'genre-id': matchedGenre.id.toString(),
                        'page': currentPage.toString(),
                        'x-action': 'get-movies-by-genre'
                    }
                });

                if (!moviesResult.ok) {
                    const data = await moviesResult.json();
                    throw new Error(data.error);
                }

                const data: MovieApiResults = await moviesResult.json();

                setMovies(data.results);
                setTotalPages(data.total_pages);
                setTotalResults(data.total_results);

            } catch (error) {
                window.showToastNotification((error as Error).message, 'error');
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

    const onPageButton = (page: number) => {

        setSearchParams({
            page: String(page)
        });
    }

    /**
     * Show either loading card template or movies if ready
     */
    const displayMovies = (): JSX.Element => {

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
                            loading={loading}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalResults={totalResults}
                            showHeader={true}
                        />
                    </div>
                </>

            )
        }
    }

    return (
        <>
            <h1 className="">{Utilities.getProperCaseString(genre)}</h1>
            <GenreList/>
            {displayMovies()}
        </>

    )
}
export default MoviesByGenre;
