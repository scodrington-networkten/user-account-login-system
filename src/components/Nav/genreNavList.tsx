import {useSharedState} from "@contexts/SharedStateConext";
import {useGenre} from "../../contexts/GenreContext";
import Utilities from "../../utilities";


/**
 * Displays a series of genres for use in the header. Is opened / closed by shared state (a toggle button in the header)
 * @returns {JSX.Element}
 * @constructor
 */
const GenreNavList = () => {

    const {genres} = useGenre()
    const {genreSubnavOpen} = useSharedState();

    if (!genres) return null;

    return (
        <nav className={`genres-subnav mt-2 ${genreSubnavOpen ? ' active' : ''}`}>
            {
                genres.map((item, index) => {
                    return Utilities.getGenreButton(item, `genre-button-${index}`);
                })
            }
        </nav>
    )
}
export default GenreNavList;
