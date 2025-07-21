import './genres-nav-button.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {useSharedState} from "@contexts/SharedStateConext.jsx";


const GenresNavButton = () => {


    const {openGenreSubnav, closeGenreSubnav, genreSubnavOpen} = useSharedState();

    /**
     * Close or open the genres sub-nav, triggering the events
     */
    const toggleGenresSubnav = () => {
        if (genreSubnavOpen) {
            closeGenreSubnav();
        } else {
            openGenreSubnav();
        }
    }


    let activeIcon = (genreSubnavOpen) ? faChevronUp : faChevronDown;

    return (

        <>
            <div className={`genres-subnav-toggle ${genreSubnavOpen ? ' active' : ''}`}>
                <button
                    title="Toggle Genres"
                    className="genres-subnav-toggle unstyled-button"
                    onClick={toggleGenresSubnav}>Genres
                    <FontAwesomeIcon className="icon" icon={activeIcon}/>
                </button>
            </div>
        </>
    );
}
export default GenresNavButton;
