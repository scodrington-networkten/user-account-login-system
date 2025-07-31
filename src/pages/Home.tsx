import MoviesList from "@components/movies-list";
import {useState, useEffect, JSX} from "react";
import LoadingCardList from "@components/loading-card-list";
import GenreList from "@components/genre-list";
import FeaturedMoviesCarousel from "@components/featured-movies-carousel";
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
                        'page': "1"
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
                window.showToastNotification((error as Error).message, 'error');
            } finally {
                setLoading(false);
            }
        }
        void apiCall();

    }, []);


    /**
     * Display either loading list or the movie content when loaded
     */
    const displayHome = (): JSX.Element => {

        if (loading) {
            return (
                <article className="hompage gap-4 flex flex-col">
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage('')}</title>
                    </Helmet>
                    <FeaturedMoviesCarousel/>
                    <div className={"px-4 w-full"}>
                        <GenreList/>
                        <LoadingCardList/>
                    </div>
                </article>
            )
        } else {
            return (
                <article className="hompage gap-4 flex flex-col">
                    <Helmet>
                        <title>{Utilities.getSiteNameForPage('')}</title>
                    </Helmet>
                    <FeaturedMoviesCarousel/>
                    <GenreList/>
                    <MoviesList
                        movies={movies}
                        loading={false}
                        currentPage={1}
                        totalPages={1}
                        showHeader={false}
                    />
                </article>
            )
        }
    }

    //return <LoadingCardList/>;
    return displayHome();

}
export default Home;
