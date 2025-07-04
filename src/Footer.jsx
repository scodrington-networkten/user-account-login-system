import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import './footer.css';
import PrimaryNav from "@components/Nav/PrimaryNav.jsx";
import {GenreContext, useGenre} from "@contexts/GenreContext.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Footer = () => {

    const {genres} = useGenre();
    const [topGenres, setTopGenres] = useState([])

    useEffect(() => {

        if (genres.length > 0) {
            setTopGenres(genres.slice(0, 10));
        } else {
            setTopGenres([])
        }


    }, [genres]);


    const getGenres = () => {

        return (
            <nav className="genres">
                {topGenres.map((item, index) => {
                    return <Link to={`/movies/${item.id}`} key={`footer-genre-${item.id}`}>{item.name}</Link>;
                })}
            </nav>
        )
    }

    const getImportantLinks = () => {
        return <PrimaryNav/>
    }


    return (
        <footer className=" bg-[var(--color-secondary)] text-gray-200 p-4 mt-4" id="page-footer">
            <div className="genres">
                <h3>Genres</h3>
                {getGenres()}
            </div>
            <div className="important-links">
                <h3>Important Links</h3>
                {getImportantLinks()}
            </div>
            <div className="popular-movies">
                <h3>Popular Movies</h3>
            </div>
            <div className="container mx-auto text-center">
                &copy; {new Date().getFullYear()} MovieSearch, powered by TheMovieDB <FontAwesomeIcon icon={faVideo}/>
            </div>
        </footer>
    )
}
export default Footer;
