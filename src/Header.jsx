import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faSearch, faVideo, faUser} from "@fortawesome/free-solid-svg-icons";

import './components/header.css';
import {useState, useRef, useEffect} from "react";

import slugify from "slugify";
import {useLocation} from 'react-router-dom';

import {useUser} from "./contexts/UserContext.jsx";
import UserActionsSidebar from "@components/sidebar/userActionsSidebar.jsx";
import PrimaryNav from "@components/Nav/PrimaryNav.jsx";

import {SharedStateProvider, useSharedState} from "@contexts/SharedStateConext.jsx";


const Header = () => {


    const location = useLocation();
    const navigate = useNavigate();
    const [userSubmenuOpen, setUserSubmenuOpen] = useState(false);
    const {user} = useUser();


    const {miniSearchFormOpen, setMiniSearchFormOpen} = useSharedState();



    //handle when we change loction, close the nav
    useEffect(() => {
        setUserSubmenuOpen(false);
    }, [location.pathname]);


    /**
     * When search icon clicked, toggle the form visability state
     */
    const onSearchIconClick = () => {


        //set a temp state to the history when clicking
        navigate("#search", {replace: false});
        setMiniSearchFormOpen(true);
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
                            <UserActionsSidebar closeMenu={() => setUserSubmenuOpen(false)}/>
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



    const getTitleSection = () => {

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



    const getLinksSection = () => {

        return (
            <section className="links items-center">
                <PrimaryNav/>
            </section>

        )
    }

    const getUserSection = () => {

        return (
            <section className="header-links flex items-center">
                {displayUserIconSection()}
            </section>
        )
    }


    return (
        <header className="page-header" id="page-header">
            <div className="container mx-auto flex items-center">


                <section className="flex flex-col md:hidden flex-1 relative">
                    <div className="inner">
                        <div className="flex justify-between flex-1">
                            {getTitleSection()}
                            {getUserSection()}
                        </div>
                        <div className="flex justify-start mt-2">
                            {getLinksSection()}
                        </div>
                    </div>
                </section>

                <section className="hidden md:flex flex-col flex-1 relative">
                    <div className="inner">
                        <div className="flex justify-between flex-1 items-center">
                            <div className="title-and-links items-center flex md:gap-4 lg:gap-6">
                                {getTitleSection()}
                                {getLinksSection()}
                            </div>
                            {getUserSection()}
                        </div>
                    </div>
                </section>




            </div>

        </header>
    )
}
export default Header;
