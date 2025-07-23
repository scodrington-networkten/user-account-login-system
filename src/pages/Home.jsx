import MoviesList from "../components/movies-list.jsx";
import {useState, useEffect} from "react";
import LoadingCardList from "../components/loading-card-list.jsx";
import GenreList from "../components/genre-list.jsx";
import FeaturedMoviesCarousel from "@components/featured-movies-carousel.jsx";
import {Helmet} from "react-helmet";
import Utilities from "../utilities";

const Home = () => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true);

    //on page load, ensure we load popular data
    useEffect(() => {
        const apiCall = async () => {

            try {
                const result = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-popular-movies',
                        'page': 1
                    }
                });
                if (!result.ok) {
                    throw new Error("Error connecting to the popular movie feed");
                }
                const data = await result.json();
                setMovies(data.results);
                //set in the local cache of latest movies
                Utilities.setUpcomingMoviesCache(data.results);

            } catch (error) {
                window.showToastNotification(error.message, 'error');
            } finally {
                setLoading(false);
            }
        }
        apiCall();

    }, []);



    /**
     * Display either loading list or the movie content when loaded
     * @returns {JSX.Element}
     */
    const displayHome = () => {

        if (loading) {
            return (
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage('')}</title>
                    </Helmet>
                    <FeaturedMoviesCarousel/>
                    <div className={"px-4 w-full"}>
                        <GenreList/>
                        <LoadingCardList/>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage('')}</title>
                    </Helmet>
                    <FeaturedMoviesCarousel/>
                    <div className={"px-4 w-full"}>
                        <GenreList/>
                        <MoviesList
                            movies={movies}
                            onNextButton={null}
                            onPrevButton={null}
                            moviesLoading={false}
                            currentPage={1}
                            totalPages={1}
                            showHeader={false}
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
