import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import './primary-nav.css';


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
     * @returns {unknown[]}
     */
    const getNavigationItems = () => {

        return navigationItems.map((item, index) => {

            const location = useLocation();
            const active = location.pathname === item.path;

            return <Link to={item.path} className={`${active ? 'active' : ''}`}>
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
