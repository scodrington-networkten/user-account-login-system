import {Link} from "react-router-dom";
import './sidebar.css';
import {useLocation} from "react-router-dom";

import {faTv, faRightFromBracket, faUser, faBookmark} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



const UserActionsSidebar = () => {

    const location = useLocation();

    const navItemClass = (path : string) : string => {
        const isActive = location.pathname === path ? 'active' : '';
        return `nav-item ${isActive}`;
    }

    return (

        <aside className="user-dashboard-sidebar">
            <Link to={"/dashboard"} className={navItemClass("/dashboard")}>
                <FontAwesomeIcon className="icon" icon={faUser}/>Dashboard</Link>
            <Link to={"/dashboard/watch-later"} className={navItemClass("/dashboard/watch-later")}>
                <FontAwesomeIcon className="icon" icon={faTv}/>Watch Later</Link>
            <Link to={"/dashboard/favorites"} className={navItemClass("/dashboard/favorites")}>
                <FontAwesomeIcon className="icon" icon={faBookmark}/>Favorites</Link>
            <Link to={"/logout"} className={navItemClass("/logout")}>
                <FontAwesomeIcon icon={faRightFromBracket} className="icon"/>Logout</Link>
        </aside>
    )
}
export default UserActionsSidebar

