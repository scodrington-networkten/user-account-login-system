import {useParams} from "react-router-dom";
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
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [genreId, setGenreId] = useState(null);


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

            const result = await fetch(`/api/get-movies?genre_id=${genreId}&page=1`);
            const json = await result.json();

            setMovies(json.json.results);
            setLoading(false);
        }
        apiCall();

    }, [genreId]);

    /**
     * @TODO - add in button functionality!
     */
    const onNextButton = () => {

    }

    /**
     * @TODO - add in button functionality!
     */
    const onPreviousButton = () => {

    }

    /**
     * Show either loading card template or movies if ready
     * @returns {JSX.Element}
     */
    const displayMovies = () => {

        if (loading) {
            return <LoadingCardList/>
        } else {
            return <MoviesList
                movies={movies}
                onNextButton={onNextButton}
                onPrevButton={onPreviousButton}
                moviesLoading={loading}
                currentPage={page}
                totalPages={1}
            />
        }
    }

    return (
        <>
            <h1 className="mb-8 text-4xl">{genre}</h1>
            <GenreList/>
            {displayMovies()}
        </>

    )
}
export default MoviesByGenre;
