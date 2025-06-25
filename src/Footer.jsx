import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className=" bg-[var(--color-secondary)] text-gray-200 p-4 mt-4" id="page-footer">
            <div className="container mx-auto text-center">
                &copy; {new Date().getFullYear()} MovieSearch, powered by TheMovieDB <FontAwesomeIcon icon={faVideo}/>
            </div>
        </footer>
    )
}
export default Footer;
