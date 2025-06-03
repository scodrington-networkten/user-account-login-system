import React from "react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import slugify from "slugify";
import './genre-button.css';

/**
 * Single Genre button, linking to the dedicated genre page
 * @param genre
 * @returns {JSX.Element}
 * @constructor
 */
const GenreButton = ({genre, isActive}) => {

    const [genreName, setGenreName] = useState('');

    useEffect(() => {
        setGenreName(() => {
            if (genre && genre.name) {
                return slugify(genre.name, {lower: true, strict: true});
            }
        })
    }, []);

    return (
        <Link to={`/movies/${genreName}`}
              className={`genre-button ${isActive ? 'active' : ''}`}>
            {genre.name}
        </Link>
    )
}

export default GenreButton;
