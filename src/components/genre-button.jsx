import React from "react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import slugify from "slugify";

/**
 * Single Genre button, linking to the dedicated genre page
 * @param genre
 * @returns {JSX.Element}
 * @constructor
 */
const GenreButton = ({genre}) => {

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
              className="text-md bg-white text-gray-700 rounded border border-gray-400 px-3 py-1 inline-block hover:bg-gray-800 hover:text-white">
            {genre.name}
        </Link>
    )
}

export default GenreButton;
