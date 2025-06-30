import React from "react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import slugify from "slugify";
import './genre-button.css';

/**
 *
 * @param genre
 * @param isActive
 * @param classes
 * @param link - if this genre is a link or not
 * @returns {Element}
 * @constructor
 */

const GenreButton = ({genre, isActive, classes = 'genre-button', link = true}) => {

    const [genreName, setGenreName] = useState('');

    useEffect(() => {
        setGenreName(() => {
            if (genre && genre.name) {
                return slugify(genre.name, {lower: true, strict: true});
            }
        })
    }, []);

    //show link or a normal item
    if (link) {
        return (
            <Link to={`/movies/${genreName}`}
                  className={`${classes} ${isActive ? 'active' : ''}`}>
                {genre.name}
            </Link>
        )
    } else {
        return (
            <span className={`${classes}`}> {genre.name}</span>
        )
    }


}

export default GenreButton;
