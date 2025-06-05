import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MoviesList from "../components/movies-list.jsx";

const SearchResults = () => {

    const [searchResults, setSearchResults] = useState(null);
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");

    useEffect(() => {

        const getApiData = async () => {
            let url = `/api/movie-search?q=${q}`;
            try {

                let response = await fetch(url);
                if (!response.ok) {
                    throw new HttpError(`There was an error connecting to the ${url} endpoint`);
                }
                return await response.json();

            } catch (error) {
                console.error(error.message);
            }
        }
        //access and pass back the json data to create the movie list
        getApiData().then(json => {

            let dataObject = {
                movies: json.json.results,
                currentPage: json.json.page,
                totalPages: json.json.total_pages,
            };

            setSearchResults(dataObject);

            console.log(json);
            console.log(dataObject);
        });


    }, [searchParams])

    const displayMovieResults = () => {

        if (searchResults === null) {
            return (
                <p>Movie results loading..</p>
            )
        } else {
            return (
                <div className="movie-results">
                    <MoviesList
                        movies={searchResults.movies}
                        moviesLoading={false}
                        onNextButton={null}
                        onPrevButton={null}
                        currentPage={searchResults.currentPage}
                        totalPages={searchResults.totalPages}
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
