import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {faVideo} from "@fortawesome/free-solid-svg-icons";


const Header = () => {
    return (
        <header className="text-white p-4 shadow-md bg-gray-900">
            <div className="container mx-auto flex justify-between items-center">
                <section className="header-title">
                    <Link to={"/"} className="flex items-center gap-2" title="Home">
                        <FontAwesomeIcon icon={faVideo}/>
                        <span className="text-xl font-bold">MovieSearch</span>
                    </Link>
                </section>
                <section className="header-links flex gap-4 items-center">
                    <nav className="space-x-4">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/movies" className="hover:underline">Movies</Link>
                    </nav>
                    <span
                        className="user-icon flex justify-center items-center bg-white rounded-full w-[30px] h-[30px] text-gray-800">
                        <Link to="/dashboard" className="hover:underline">
                            <FontAwesomeIcon icon={faUser}/>
                        </Link>
                    </span>
                </section>
            </div>
        </header>
    )
}
export default Header;
