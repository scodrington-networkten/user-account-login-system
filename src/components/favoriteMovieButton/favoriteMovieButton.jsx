import {useState, useEffect, useContext} from "react";
import {useUser} from "@contexts/UserContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkFull} from "@fortawesome/free-solid-svg-icons";
import {faBookmark as faBookmarkEmpty} from "@fortawesome/free-regular-svg-icons";

const FavoriteMovieButton = ({movie}) => {


    const {user, toggleFavoriteMovie} = useUser();
    if (!user) return;
    if (!movie) return;

    //determine if currently favorite
    const isFavorite = user.favorite_movies.some(item => {
        return item.movie_id === movie.id;
    });

    /**
     * Either add or remove movie from users fav list
     * @returns {Promise<void>}
     */
    const handleClick = async () => {

        const result = await toggleFavoriteMovie(movie.id);
        if (result.success) {
            window.showToastNotification(result.message, 'success');
        } else {
            window.showToastNotification(result.message, 'error');
        }

    }

    // console.log(user);

    if (isFavorite) {
        return <FontAwesomeIcon icon={faBookmarkFull} onClick={handleClick}/>
    } else {
        return <FontAwesomeIcon icon={faBookmarkEmpty} onClick={handleClick}/>;
    }


}
export default FavoriteMovieButton;
