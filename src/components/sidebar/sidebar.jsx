import {Link} from "react-router-dom";
import './sidebar.css';
import {useLocation} from "react-router-dom";

const Sidebar = () => {

    const location = useLocation();

    const navItemClass = (path) => {
        const isActive = location.pathname === path ? 'active' : '';
        return `nav-item ${isActive}`;
    }

    return (

        <aside className="user-dashboard-sidebar">
            <Link to={"/dashboard"} className={navItemClass("/dashboard")}>Dashboard</Link>
            <Link to={"/dashboard/watch-later"} className={navItemClass("/dashboard/watch-later")}>Watch Later</Link>
            <Link to={"/dashboard/favorites"} className={navItemClass("/dashboard/favorites")}>Favorites</Link>
        </aside>
    )
}
export default Sidebar

