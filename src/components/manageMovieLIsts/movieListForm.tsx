import './movie-list-form.css';
import {useSharedState} from "@contexts/SharedStateConext";

const MovieListForm = () => {

    const {movieListFormOpen, openMovieListForm, closeMovieListForm, setMovieListFormOpen} = useSharedState();

    if (movieListFormOpen) {
        return (
            <div className="movie-list-form">
                <p>Hello</p>
            </div>
        )
    } else {
        return null;
    }

}
export default MovieListForm;
