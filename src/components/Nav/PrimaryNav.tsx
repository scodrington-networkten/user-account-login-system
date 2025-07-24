import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import './primary-nav.css';
import {JSX} from "react";


const PrimaryNav = () => {

    const navigationItems = [
        {
            name: 'Upcoming',
            path: "/movies/upcoming"
        },
        {
            name: 'Popular',
            path: "/movies/popular"
        },
        {
            name: "Latest",
            path: "/movies/latest"
        }
    ]


    /**
     * Return the navigation items, factoring in if they are active or not
     */
    const getNavigationItems = () : JSX.Element[] => {

        return navigationItems.map((item, index) => {

            const location = useLocation();
            const active = location.pathname === item.path;

            return <Link to={item.path} className={`${active ? 'active' : ''}`} key={`nav-item-${index}`}>
                {item.name}
            </Link>
        })
    }

    return (
        <nav className="primary-nav">
            {getNavigationItems()}
        </nav>
    )
}
export default PrimaryNav;
