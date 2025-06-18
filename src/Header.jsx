import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faSearch, faVideo, faUser} from "@fortawesome/free-solid-svg-icons";

import './components/header.css';
import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import slugify from "slugify";
import {useLocation} from 'react-router-dom';

import {useUser} from "./contexts/UserContext.jsx";
import Sidebar from "@components/sidebar/sidebar.jsx";


const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef(null);

    const [searchInput, setSearchInput] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);

    const [userSubmenuOpen, setUserSubmenuOpen] = useState(false);

    const {user} = useUser();

    //when search form visability changes, ensure if its visible we set focus
    useEffect(() => {

        if (searchVisible) {
            inputRef.current.focus();
        }

    }, [searchVisible]);

    //handle when we change loction, close the nav
    useEffect(() => {
        setUserSubmenuOpen(false);
    }, [location.pathname]);


    /**
     * When search icon clicked, toggle the form visability state
     */
    const onSearchIconClick = () => {

        setSearchVisible((prevState) => {
            return !prevState;
        });
    }

    /**
     * Handle search submit and move
     * @param e
     */
    const handleSearchSubmit = (e) => {

        e.preventDefault();

        setSearchVisible(false);

        if (searchInput.trim() !== '') {

            let urlEncodedQuery = slugify(searchInput, {lower: true, strict: true});
            navigate(`/search?q=${urlEncodedQuery}`);
            setSearchInput('');

        }

    }


    //display header section based on logged in user
    const displayUserIconSection = () => {

        if (user !== null) {
            return (
                <div className="flex items-center justify-center gap-3">
                    <div className="first-name">
                        <p>{user.first_name}</p>
                    </div>
                    <div
                        className="relative"
                        onMouseEnter={() => setUserSubmenuOpen(true)}   // open submenu on hover (desktop)
                        onMouseLeave={() => setUserSubmenuOpen(false)}  // close submenu on hover out
                    >
                        <div
                            className="user-icon cursor-pointer"
                            onClick={() => setUserSubmenuOpen(!userSubmenuOpen)}  // toggle on click (mobile)
                        >
                            <FontAwesomeIcon icon={faUser}/>
                        </div>

                        <nav
                            className={`header-user-submenu absolute top-full right-0 mt-2 z-50 ${
                                userSubmenuOpen ? "block" : "hidden"
                            }`}
                        >
                            <Sidebar closeMenu={() => setUserSubmenuOpen(false)}/>
                        </nav>
                    </div>
                </div>

            );
        } else {
            return (
                <Link to="/login">
                    <p>Login</p>
                </Link>
            )
        }
    }

    return (
        <header className="page-header">
            <div className="container mx-auto flex justify-between items-center">
                <section className="header-title flex gap-4  justify-stretch items-center">
                    <Link to={"/"} className="flex items-center gap-2" title="Home">
                        <FontAwesomeIcon icon={faVideo}/>
                        <span className="logo-text ">MovieSearch</span>
                    </Link>
                    <FontAwesomeIcon className="search-icon" title="Lets have a search!" icon={faSearch}
                                     onClick={onSearchIconClick}/>
                    {searchVisible &&
                        <div className="mini-search-form">
                            <form onSubmit={handleSearchSubmit} className="">
                                <input
                                    ref={inputRef}
                                    name="search-text-inpit"
                                    type="text"
                                    className=""
                                    placeholder="Find a movie"
                                    value={searchInput}
                                    onChange={(e) => {
                                        setSearchInput(e.target.value);
                                    }}
                                />
                                <button type="submit" className="">
                                    <FontAwesomeIcon className="search-submit-icon" title="movie search"
                                                     icon={faSearch}/>
                                </button>
                            </form>
                        </div>
                    }
                </section>
                <section className="header-links flex gap-4 items-center">
                    {displayUserIconSection()}
                </section>
            </div>
        </header>
    )
}
export default Header;
