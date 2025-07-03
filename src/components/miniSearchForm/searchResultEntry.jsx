import './search-result-entry.css'
import Utilities from "../../utilities.jsx";
import {useGenre} from "@contexts/GenreContext.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

/**
 * Single search result entry when using the mini search form
 * @param movie
 * @returns {JSX.Element}
 * @constructor
 */
const SearchResultEntry = ({movie}) => {

    const {genres} = useGenre();
    const [movieGenres, setMovieGenres] = useState([]);

    //on load, correctly set up the genres for display
    useEffect(() => {
        let tempGenres = [];
        movie.genre_ids.forEach((item) => {
            const matchedGenre = genres.find(genre => genre.id === item);
            if (matchedGenre) {
                tempGenres.push(matchedGenre);
            }
        })
        setMovieGenres(tempGenres);

    }, [movie]);


    return (
        <Link to={`/movie/${movie.id}`}>
            <article className="search-result-entry">

                <div className="left">
                    <img
                        src={Utilities.getApiImageUrl(movie.poster_path, 'poster', 'w92')}
                        alt={movie.title}
                    />
                </div>
                <div className="right">
                    <h3 className="title">{movie.original_title}</h3>
                    <p className="date">{Utilities.formatDate(movie.release_date)}</p>

                    <div className="review-section">
                        <div className="review-stars-section">{Utilities.getStarsSection(movie.vote_average)}</div>
                        <div className="review-count-section">{Utilities.getVotesSection(movie.vote_count)}</div>
                    </div>

                    {movieGenres.length > 0 &&
                        <section className="genre-section">
                            {movieGenres.map((item, index) => (
                                <p className="genre button button-disabled button-tiny button-simple"
                                   key={`genre-button-${index}`}>{item.name}</p>
                            ))}
                        </section>
                    }
                </div>
            </article>
        </Link>
    )
}
export default SearchResultEntry;
