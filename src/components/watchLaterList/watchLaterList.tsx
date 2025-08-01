import {useEffect, useState} from "react";
import {Movie} from "@contracts/movie";
import {useUser} from "@contexts/UserContext";
import Utilities from "../../utilities";
import LoadingCardList from "@components/loading-card-list";
import MoviesList from "@components/movies-list";

const WatchLaterList = () => {

    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {user} = useUser();


    useEffect(() => {

        const getMovies = async () => {

            const collection: Movie[] = [];
            if (user === null) return;

            setLoading(true);
            const moviePromises = user?.watch_later_movies.map(async (item) => {

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
    if (user.watch_later_movies.length === 0) {
        return (
            <p>You currently dont have any movies you've added to your watch later list</p>
        )
    }

    if (loading) {
        return (
            <>
                <p>Loading your movies...</p>
                <LoadingCardList cssClass={'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'} items={6}/>
            </>
        )
    }


    if (movies === null) return null;

    //has movies to display
    return (
        <MoviesList
            movies={movies}
            cssClasses={'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'}
            showPagination={false}
        />
    )
}
export default WatchLaterList;
