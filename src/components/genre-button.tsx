import React, {JSX} from "react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import slugify from "slugify";
import './genre-button.css';
import {Genre} from "@contracts/genre";


type GenreButtonProps = {
    genre: Genre,
    isActive?: boolean,
    classes?: string,
    link?: boolean
}

const GenreButton = ({genre, isActive, classes = 'genre-button', link = true}: GenreButtonProps): JSX.Element => {
    const [genreName, setGenreName] = useState<string | null>(null);

    //on load, set the genre name correctly
    useEffect(() => {
        setGenreName(() => {
            if (genre && genre.name) {
                return slugify(genre.name, {lower: true, strict: true});
            }
            return null;
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
