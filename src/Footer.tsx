import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import './footer.css';
import PrimaryNav from "@components/Nav/PrimaryNav";
import {useGenre} from "@contexts/GenreContext";
import {JSX, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Utilities from "./utilities";
import {Genre} from "@contracts/genre";
import {MovieResult} from "@contracts/movieResult"


const Footer = () => {

    const {genres} = useGenre();
    const [topGenres, setTopGenres] = useState<Genre[] | null>(null);
    const [recentMovies, setRecentMovies] = useState<MovieResult[] | null>(null);

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
        const recent: MovieResult[] | null = Utilities.getUpcomingMoviesCache();
        if (recent != null) {
            setRecentMovies(recent.slice(0, 5));
        }

    }, [])

    const getGenres = (): JSX.Element => {

        if (!topGenres || topGenres.length === 0) {
            return (
                <p>There are no current genres to display</p>
            )
        }

        return (
            <nav className="genres">
                {topGenres.map((item, index) => {
                    const name = Utilities.getSlugifiedGenreOrKeywordName(item);
                    return <Link to={`/movies/${name}`} key={`footer-genre-${item.id}`}>{item.name}</Link>;
                })}
            </nav>
        )
    }

    /**
     * Important links used in the header
     */
    const getImportantLinks = (): JSX.Element => {
        return <PrimaryNav/>
    }

    /**
     * Shows recent movies populated from the homepage
     */
    const getRecentMovies = (): JSX.Element => {

        if (!recentMovies || recentMovies.length === 0) {
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
