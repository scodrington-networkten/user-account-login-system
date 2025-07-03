import MoviesList from "@components/movies-list.jsx";
import {useState, useEffect} from "react";
import {useUser} from "@contexts/UserContext.jsx";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoadingCardList from "@components/loading-card-list.jsx";
import Utilities from "../../utilities.jsx";


/**
 * A listing of all favorited movies for the user
 * @constructor
 */
const FavoriteList = () => {

    const [movies, setMovies] = useState([]);
    const {user} = useUser();
    const [loading, setLoading] = useState(false);


    //fetch movie data based on user favorited items
    //TODO: make it a single call not multiple
    useEffect(() => {

        const getMovies = async () => {

            const collection = [];

            if (user === null) return;

            setLoading(true);
            const moviePromises = user?.favorite_movies.map(async (item) => {

                try {
                    const result = await Utilities.getMovie(item.movie_id);
                    collection.push(result);

                } catch (error) {
                    window.showToastNotification(error.message, 'error');
                }

            });

            await Promise.all(moviePromises);

            setLoading(false);
            setMovies(collection);
        }
        getMovies();

    }, [user]);

    if (user === null) return;


    //no movies yet
    if (user.favorite_movies.length === 0) {
        return (
            <p>You currently dont have any movies you've marked as a favorite</p>
        )
    }

    if (loading) {
        return (
            <>
                <p>Loading your favorite movies...</p>
                <LoadingCardList cssClass={'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'} items={6}/>
            </>

        )
    }

    //has movies to display
    return (
        <MoviesList movies={movies} cssClasses={'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'}
                    showPagination={false}/>
    )
}
export default FavoriteList;
