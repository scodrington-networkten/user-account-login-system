import {MovieResult} from "@contracts/movieResult";
import {Movie} from "@contracts/movie";
import {faList, faListCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useUser} from "@contexts/UserContext";
import {useState} from "react";
import "./watch-later-button.css";


type WatchLaterMovieButtonProps = {
    movie: MovieResult | Movie,
    isOnWatchlist: boolean
}
const WatchLaterMovieButton = ({movie, isOnWatchlist}: WatchLaterMovieButtonProps) => {

    const {user, toggleWatchLaterMovie} = useUser();
    const [loading, setLoading] = useState<boolean>(false);

    if (!user) return;
    if (!movie) return;

    const handleClick = async () => {

        try {
            setLoading(true);
            const result = await toggleWatchLaterMovie(movie.id);
            if (result.success) {
                window.showToastNotification(result.message, 'success');
            } else {
                window.showToastNotification(result.message, 'error');
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const label = isOnWatchlist ? 'Remove from Watch List' : 'Add to Watch List';
    const classes = `${loading ? 'inactive' : ''} ${isOnWatchlist ? 'active' : ''}`.trim();

    return (
        <button
            onClick={handleClick}
            className={`watch-later-button ${classes}`}
            aria-label={label}
            disabled={loading}
            title={label}
            style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}
        >
            <FontAwesomeIcon icon={isOnWatchlist ? faListCheck : faList}/>
        </button>
    )
}
export default WatchLaterMovieButton;
