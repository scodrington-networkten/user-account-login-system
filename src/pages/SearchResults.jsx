import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MoviesList from "../components/movies-list.jsx";


const SearchResults = () => {


    //search variables
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get("q");
    const currentPage = parseInt(searchParams.get('page') ?? '1', 10) || 1;

    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {

        const getApiData = async () => {

            setLoading(true);
            let url = `/api/movie-search?q=${q}&page=${currentPage}`;
            try {

                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`There was an error connecting to the ${url} endpoint`);
                }
                return await response.json();

            } catch (error) {
                console.error(error.message);
            }


        }
        //access and pass back the json data to create the movie list
        getApiData().then(json => {
            setMovies(json.json.results);
            setTotalPages(json.json.total_pages);
            setLoading(false);
        });


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

    const onPageButton = (page) => {

        setSearchParams({
            q: q,
            page: String(page)
        });
    }

    const displayMovieResults = () => {

        if (loading) {
            return (
                <p>Movie results loading..</p>
            )
        } else {
            return (
                <div className="movie-results">
                    <MoviesList
                        movies={movies}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevButton={onPrevButton}
                        onNextButton={onNextButton}
                        loading={loading}
                        onPagesButton={onPageButton}
                    />
                </div>
            )
        }
    }

    return (
        <div className="search-results m-auto container flex flex-col gap-4">
            <h1 className="text-3xl mt-4">Search Results: <span className="italic">{q}</span></h1>
            {displayMovieResults()}
        </div>
    )
}

export default SearchResults;
