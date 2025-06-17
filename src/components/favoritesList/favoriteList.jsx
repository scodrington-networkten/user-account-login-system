import MoviesList from "@components/movies-list.jsx";
import {useState, useEffect} from "react";
import {useUser} from "@contexts/UserContext.jsx";


/**
 * A listing of all favorited movies for the user
 * @constructor
 */
const FavoriteList = () => {

    const [movies, setMovies] = useState([]);
    const {user} = useUser();

    if (user === null) return;

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

    //no movies yet
    if (user.favorite_movies.length === 0) {
        return (
            <p>You currently dont have any movies you've marked as a favorite</p>
        )
    }

    if (movies.length === 0) {
        return (
            <p>Your favorites are loading</p>
        )
    }

    //has movies to display
    return (
        <MoviesList movies={movies}/>
    )
}
export default FavoriteList;
