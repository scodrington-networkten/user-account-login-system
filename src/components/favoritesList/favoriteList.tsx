import MoviesList from "@components/movies-list";
import {useState, useEffect, JSX} from "react";
import {useUser} from "@contexts/UserContext";
import LoadingCardList from "@components/loading-card-list";
import Utilities from "../../utilities";
import {Movie} from "@contracts/movie";


/**
 * A listing of all favorited movies for the user
 * @constructor
 */
const FavoriteList = (): JSX.Element | null => {

    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {user} = useUser();


    //fetch movie data based on user favorited items
    //TODO: make it a single call not multiple
    useEffect(() => {

        const getMovies = async () => {

            const collection: Movie[] = [];

            if (user === null) return;

            setLoading(true);
            const moviePromises = user?.favorite_movies.map(async (item) => {

                try {
                    const result = await Utilities.getMovie(item.movie_id);
                    collection.push(result);

                } catch (error) {
                    window.showToastNotification((error as Error).message, 'error');
                }

            });

            await Promise.all(moviePromises);

            setLoading(false);
            setMovies(collection);
        }
        void getMovies();

    }, [user]);


    if (user === null) {
        return null;
    }

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


    if (movies === null) return null;

    //has movies to display
    return (
        <MoviesList movies={movies} cssClasses={'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'}
                    showPagination={false}/>
    )
}
export default FavoriteList;
