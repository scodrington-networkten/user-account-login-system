// Make this a proper React component, not a utility function:
import {useLocation} from "react-router-dom";
import slugify from "slugify";
import GenreButton from "@components/genre-button.jsx";

/**
 * Wrapper to create a genre button (so we can access useLocation)
 * @param genre
 * @returns {JSX.Element}
 * @constructor
 */
const GenreButtonWrapper = ({genre}) => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    let slugifiedGenre = slugify(genre.name, {lower: true});
    let isActive = (lastSegment === slugifiedGenre);

    return <GenreButton genre={genre} isActive={isActive}/>
};
export default GenreButtonWrapper;
