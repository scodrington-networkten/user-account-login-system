import MoviesList from "../components/movies-list.jsx";
import {useState, useEffect} from "react";
import LoadingCardList from "../components/loading-card-list.jsx";
import GenreList from "../components/genre-list.jsx";
import LatestMovies from "../components/latest-movies.jsx";

const Home = () => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true);


    //on page load, ensure we load popular data
    useEffect(() => {
        const apiCall = async () => {
            const movieData = await fetchPopularMovies()
            setMovies(movieData.results);
            setLoading(false);
        }
        apiCall();

    }, []);


    const fetchPopularMovies = async () => {
        const result = await fetch('/api/get-popular-movies');
        if (!result.ok) {
            alert("Error connecting to '/api/get-popular-movies' ");
            return;
        }
        const data = await result.json();
        return data.json;
    }

    const getPopularMovies = () => {

    }

    const onNextButton = () => {

    }

    const onPreviousButton = () => {

    }


    /**
     * Display either loading list or the movie content when loaded
     * @returns {JSX.Element}
     */
    const displayHome = () => {

        if (loading) {
            return (
                <>
                    <LatestMovies/>
                    <div className={"px-4 w-full"}>
                        <GenreList/>
                        <LoadingCardList/>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <LatestMovies/>
                    <div className={"px-4 w-full"}>
                        <GenreList/>
                        <MoviesList
                            movies={movies}
                            onNextButton={onNextButton}
                            onPrevButton={onPreviousButton}
                            moviesLoading={false}
                            currentPage={1}
                            totalPages={1}
                        />
                    </div>

                </>

            )
        }
    }

    //return <LoadingCardList/>;
    return displayHome();

}
export default Home;
