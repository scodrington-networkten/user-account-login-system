import MoviesList from "../components/movies-list.jsx";
import {useState, useEffect} from "react";

const Home = () => {

    const [movies, setMovies] = useState([])

    //on page load, ensure we load popular data
    useEffect(() => {
        const apiCall = async () => {
            const movieData = await fetchPopularMovies()
            setMovies(movieData.results);
        }
        apiCall();

    }, []);


    const fetchPopularMovies = async () => {
        const result = await fetch('/api/get-popular-movies');
        const data = await result.json();
        return data.json;
    }

    const getPopularMovies = () => {

    }

    const onNextButton = () => {

    }

    const onPreviousButton = () => {

    }


    return (
        <>
            <h1>this is the home template</h1>
            <MoviesList
                movies={movies}
                onNextButton={onNextButton}
                onPrevButton={onPreviousButton}
                moviesLoading={false}
                currentPage={1}
                totalPages={1}
            />
        </>

    )
}
export default Home;
