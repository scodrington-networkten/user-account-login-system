import {useParams, useSearchParams} from "react-router-dom";
import GenreList from "../components/genre-list.jsx";
import MoviesList from "../components/movies-list.jsx";
import {useEffect, useState} from "react";
import _ from 'lodash';
import slugify from "slugify";
import LoadingCardList from "../components/loading-card-list.jsx";

const MoviesByGenre = () => {

    //extract genre token from the url
    const {genre} = useParams();
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [genreId, setGenreId] = useState(null);

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
     * Given the genre name (from the url), determine the internal ID to use to fetch movies with
     * that genre ID
     */
    useEffect(() => {


        const getGenreData = async () => {

            const result = await fetch('/api/get-genres');
            const json = await result.json();

            let allGenres = json.data.genres;

            //find the matched genre
            let matchedGenre = _.find(allGenres, (item, index) => {
                let slugifyName = slugify(item.name, {lower: true});
                return slugifyName === genre;
            })

            if (matchedGenre !== undefined) {
                setGenreId(matchedGenre.id);
            }
        }
        getGenreData();
    }, [genre]);

    /**
     * Once a genre has been found, find movies for it
     */
    useEffect(() => {
        const apiCall = async () => {

            if (!genreId) return;

            setLoading(true);

            const result = await fetch(`/api/get-movies?genre_id=${genreId}&page=${currentPage}`);
            const json = await result.json();


            console.log(json.json);
            setMovies(json.json.results);
            setTotalPages(json.json.total_pages)

            setLoading(false);
        }
        apiCall();

    }, [genreId, searchParams]);

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
                <div className="container">
                    <LoadingCardList/>
                </div>
            )

        } else {
            return (
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
            )
        }
    }

    return (
        <div className="container m-auto gap-2 flex flex-col p-4">
            <h1 className="text-4xl py-4">{genre}</h1>
            <GenreList/>
            {displayMovies()}
        </div>

    )
}
export default MoviesByGenre;
