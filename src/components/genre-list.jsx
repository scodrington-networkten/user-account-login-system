import React from "react";
import GenreButton from "./genre-button.jsx";

import {useContext} from "react";
import {GenreContext} from "../contexts/GenreContext.jsx";
import {useLocation} from "react-router-dom";

import _ from "lodash";
import slugify from "slugify";

/**
 * Shows a list of genres, pulled from the API
 * @returns {JSX.Element}
 * @constructor
 */
const GenreList = () => {


    const {genres} = useContext(GenreContext);

    if (!genres) {
        return (
            <div>Loading Genres</div>
        )
    }

    /**
     * Output the genre button, factoring in the URL to determine if this genre is currently active
     * @param genre
     * @param index
     * @returns {Element}
     */
    const getGenreButton = (genre, index) => {


        const location = useLocation();
        const pathSegments = location.pathname.split("/").filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];

        let slugifiedGenre = slugify(genre.name, {lower: true});
        let isActive = (lastSegment === slugifiedGenre ? true : false);

        return <GenreButton key={index} genre={genre} isActive={isActive}/>
    }


    return (

        <div className="genres justify-center container m-auto flex gap-2 flex-wrap">
            {genres.map((item, index) => (
                getGenreButton(item, index)
            ))}
        </div>
    )
}
export default GenreList;
