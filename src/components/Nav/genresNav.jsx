import {useContext, useEffect, useState} from "react";
import {GenreContext} from "@contexts/GenreContext.jsx";
import Utilities from "../../utilities.jsx";
import {useLocation} from "react-router-dom";
import './genres-nav.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";


const GenresNav = () => {


    const {genres} = useContext(GenreContext);
    const [navOpen, setNavOpen] = useState(false);
    const location = useLocation();

    //when location updates, ensure we toggle off
    useEffect(() => {
        setNavOpen(false);
    }, [location.pathname]);


    const toggleGenresSubnav = () => {
        setNavOpen(!navOpen);
    }


    let activeIcon = (navOpen) ? faChevronUp : faChevronDown;

    return (

        <>
            <div className={`genres-subnav-toggle ${navOpen ? ' active' : ''}`}>
                <button
                    title="Toggle Genres"
                    className="genres-subnav-toggle unstyled-button"
                    onClick={toggleGenresSubnav}>Genres
                    <FontAwesomeIcon className="icon" icon={activeIcon}/>
                </button>

            </div>
            <nav className={`genres-subnav ${navOpen ? ' active' : ''}`}>
                {
                    genres.map((item, index) => {
                        return Utilities.getGenreButton(item, index, 'nav-genre-button-');
                    })
                }
            </nav>

        </>


    );
}
export default GenresNav;
