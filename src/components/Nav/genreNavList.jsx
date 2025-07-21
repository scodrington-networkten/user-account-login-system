import {useSharedState} from "@contexts/SharedStateConext.jsx";
import {useLocation} from "react-router-dom";
import {useContext, useEffect} from "react";
import {GenreContext} from "@contexts/GenreContext.jsx";
import Utilities from "../../utilities.jsx";

/**
 * Displays a series of genres for use in the header. Is opened / closed by shared state (a toggle button in the header)
 * @returns {JSX.Element}
 * @constructor
 */
const GenreNavList = () => {

    const {genres} = useContext(GenreContext);
    const {genreSubnavOpen} = useSharedState();

    if(!genres) return null;

    return (
        <nav className={`genres-subnav mt-2 ${genreSubnavOpen ? ' active' : ''}`}>
            {

                genres.map((item, index) => {
                    return Utilities.getGenreButton(item, index, 'nav-genre-button-');
                })
            }
        </nav>
    )
}
export default GenreNavList;
