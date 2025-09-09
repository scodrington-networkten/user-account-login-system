import {useEffect} from "react";
import {useUser} from "@contexts/UserContext";
import {MovieResult} from "@contracts/movieResult";
import {Movie} from "@contracts/movie";
import {useSharedState} from "@contexts/SharedStateConext";

type OpenMovieListButtonProps = {
    movie: MovieResult | Movie,
}
const OpenMovieListButton = ({movie} : OpenMovieListButtonProps) => {

    const {user} = useUser();
    const {movieListFormOpen,openMovieListForm, closeMovieListForm, setMovieListFormOpen} = useSharedState();

    useEffect(() => {

    }, [user]);

    //open up the movie list form
    const handleClick = async () => {
        setMovieListFormOpen(!movieListFormOpen);
    }

    return (
        <button
            onClick={handleClick}
            className={`open-movie-list-button`}
        >
            Add To List
        </button>
    )
}
export default OpenMovieListButton;
