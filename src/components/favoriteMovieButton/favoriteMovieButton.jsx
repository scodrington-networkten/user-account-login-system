import {useState, useEffect, useContext} from "react";
import {useUser} from "@contexts/UserContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkFull} from "@fortawesome/free-solid-svg-icons";
import {faBookmark as faBookmarkEmpty} from "@fortawesome/free-regular-svg-icons";

/**
 * Button for adding and removing the associated movie from the users favorites
 */
const FavoriteMovieButton = ({movie, isFavorited = false}) => {


    const {user, toggleFavoriteMovie} = useUser();
    const [loading, setLoading] = useState(false);

    if (!user) return;
    if (!movie) return;


    /**
     * Either add or remove movie from users fav list
     * @returns {Promise<void>}
     */
    const handleClick = async () => {

        setLoading(true);
        const result = await toggleFavoriteMovie(movie.id);
        if (result.success) {
            window.showToastNotification(result.message, 'success');
        } else {
            window.showToastNotification(result.message, 'error');
        }
        setLoading(false);
    }

    const label = isFavorited ? 'Remove from favorites' : 'Add to favorites';

    return (
        <button
            onClick={handleClick}
            className={loading ? 'inactive' : ''}
            aria-label={label}
            disabled={loading}
            title={label}
            style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}
        >
            <FontAwesomeIcon icon={isFavorited ? faBookmarkFull : faBookmarkEmpty}/>
        </button>
    )


}
export default FavoriteMovieButton;
