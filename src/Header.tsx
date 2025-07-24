import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faSearch, faVideo, faUser,} from "@fortawesome/free-solid-svg-icons";

import './components/header.css';
import {useState, useEffect, JSX} from "react";
import {useLocation} from 'react-router-dom';

import {useUser} from "@contexts/UserContext";
import UserActionsSidebar from "@components/sidebar/userActionsSidebar";
import PrimaryNav from "@components/Nav/PrimaryNav";

import {useSharedState} from "@contexts/SharedStateConext";
import GenresNavButton from "@components/Nav/genresNavButton";
import GenreNavList from "@components/Nav/genreNavList";


const Header = (): JSX.Element => {

    const location = useLocation();
    const [userSubmenuOpen, setUserSubmenuOpen] = useState<Boolean>(false);
    const {user} = useUser();

    const {openMiniSearchForm} = useSharedState();

    //handle when we change location, close the nav
    useEffect(() => {
        setUserSubmenuOpen(false);
    }, [location.pathname]);


    /**
     * When search icon clicked, toggle the form visability state
     */
    const onSearchIconClick = () => {
        openMiniSearchForm();
    }

    //display header section based on logged-in user
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
                            <UserActionsSidebar/>
                        </nav>
                    </div>
                </div>

            );
        } else {
            return (
                <Link to="/login" className="login-button">
                    Login
                    <FontAwesomeIcon className="icon" icon={faUser}/>
                </Link>
            )
        }
    }


    const getTitleSection = (): JSX.Element => {
        return (
            <div className="header-title flex items-center gap-2">
                <Link to={"/"} className="flex items-center gap-2" title="Home">
                    <FontAwesomeIcon icon={faVideo}/>
                    <span className="logo-text ">MovieSearch</span>
                </Link>
                <FontAwesomeIcon
                    className="search-icon"
                    title="Lets have a search!"
                    icon={faSearch}
                    onClick={onSearchIconClick}
                />
            </div>
        )
    }


    const getLinksSection = (): JSX.Element => {
        return (
            <section className="links items-center flex flex-wrap w-full gap-4">
                <PrimaryNav/>
                <GenresNavButton/>
            </section>

        )
    }

    const getUserSection = (): JSX.Element => {
        return (
            <section className="header-links flex items-center">
                {displayUserIconSection()}
            </section>
        )
    }


    return (
        <header className={`page-header ${location.pathname === "/" ? 'homepage' : ''}`} id="page-header">
            <div className="container mx-auto flex items-center ">

                <section className="flex flex-col md:hidden flex-1 relative">
                    <div className="inner">
                        <div className="flex justify-between items-start flex-1">
                            {getTitleSection()}
                            {getUserSection()}
                        </div>
                        <div className="flex justify-start mt-2">
                            {getLinksSection()}
                        </div>
                        <GenreNavList/>
                    </div>
                </section>

                <section className="hidden md:flex flex-col flex-1 relative j">
                    <div className="inner">
                        <div className="flex items-center justify-between">
                            <div className="title-and-links items-start flex md:gap-4 lg:gap-6 grow">
                                {getTitleSection()}
                                {getLinksSection()}
                            </div>
                            {getUserSection()}
                        </div>
                        <GenreNavList/>
                    </div>
                </section>


            </div>

        </header>
    )
}
export default Header;
