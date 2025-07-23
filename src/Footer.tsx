import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import './footer.css';
import PrimaryNav from "@components/Nav/PrimaryNav";

import {GenreContext, useGenre} from "@contexts/GenreContext";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Utilities from "./utilities";

const Footer = () => {

    const {genres} = useGenre();
    const [topGenres, setTopGenres] = useState([])

    //movie specifics
    const [recentMovies, setRecentMovies] = useState([]);


    //select the top X genres for display in footer
    useEffect(() => {

        if (!genres) return;

        if (genres.length > 0) {
            setTopGenres(genres.slice(0, 5));
        } else {
            setTopGenres([])
        }
    }, [genres]);

    //pull from recent movie cache (populated on homepage load)
    useEffect(() => {
        const recent = Utilities.getUpcomingMoviesCache();

        console.log(recent);

        if (recent != null) {
            setRecentMovies(recent.slice(0, 5));
        }

    }, [])


    /**
     * Shows a sub-set of the saved genres
     * @returns {JSX.Element}
     */
    const getGenres = () => {

        if (topGenres.length === 0) {
            return (
                <p>There are no current genres to display</p>
            )
        }

        return (
            <nav className="genres">
                {topGenres.map((item, index) => {
                    return <Link to={`/movies/${item.id}`} key={`footer-genre-${item.id}`}>{item.name}</Link>;
                })}
            </nav>
        )
    }

    /**
     * Important links used in the header
     * @returns {JSX.Element}
     */
    const getImportantLinks = () => {
        return <PrimaryNav/>
    }

    /**
     * Shows recent movies populated from the homapage
     * @returns {JSX.Element}
     */
    const getRecentMovies = () => {


        if (recentMovies.length === 0) {
            return (
                <p>There are no recent movies to display</p>
            )
        }

        return (
            <div className="recent-movies">
                {recentMovies.map((item, index) => (
                    <Link to={`/movie/${item.id}`} key={`recent-movies-item-${index}`}>
                        {item.original_title}
                    </Link>
                ))}
            </div>
        )


    }

    return (
        <footer className="" id="page-footer">
            <div className="inner">
                <div className="footer-links genres">
                    <h3>Genres</h3>
                    {getGenres()}
                </div>
                <div className="footer-links important-links">
                    <h3>Useful Links</h3>
                    {getImportantLinks()}
                </div>
                <div className="footer-links popular-movies">
                    <h3>Recent Movies</h3>
                    {getRecentMovies()}
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} MovieSearch, powered by TheMovieDB <FontAwesomeIcon
                icon={faVideo}/>
            </div>

        </footer>
    )
}
export default Footer;
