import MoviesList from "@components/movies-list.jsx";
import {useState, useEffect} from "react";
import {useUser} from "@contexts/UserContext.jsx";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


/**
 * A listing of all favorited movies for the user
 * @constructor
 */
const FavoriteList = () => {

    const [movies, setMovies] = useState([]);
    const {user} = useUser();



    //fetch movie data based on user favorited items
    //TODO: make it a single call not multiple
    useEffect(() => {

        const getMovies = async () => {

            const collection = [];
            const moviePromises = user?.favorite_movies.map(async (item) => {

                try {
                    const result = await fetch(`/api/get-movie?id=${item.movie_id}`);
                    if (result.ok) {
                        const movieData = await result.json();
                        collection.push(movieData.json); // fix: just movieData, not movieData.json
                    }
                } catch (error) {
                    console.error('Failed to fetch movie', error);
                }
            });

            await Promise.all(moviePromises);

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

    if (movies.length === 0) {
        return (
            <p><FontAwesomeIcon className="text-lg fa-spin" icon={faSpinner}/></p>
        )
    }

    //has movies to display
    return (
        <MoviesList movies={movies} cssClasses={'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'} showPagination={false}/>
    )
}
export default FavoriteList;
