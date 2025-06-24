import {Link} from "react-router-dom";
const PrimaryNav = () => {

    return (
        <nav className="primary-nav flex gap-2">
            <Link to={"/movies/latest"} className="">Latest</Link>
            <Link to={"/movies/popular"} className="">Popular</Link>
        </nav>
    )
}
export default PrimaryNav;
