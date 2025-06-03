import React from "react";
import GenreButton from "./genre-button.jsx";

import {useContext} from "react";
import {GenreContext} from "../contexts/GenreContext.jsx";

/**
 * Shows a list of genres, pulled from the API
 * @returns {JSX.Element}
 * @constructor
 */
const GenreList = () => {


    const {genres} = useContext(GenreContext);

    console.log(genres);

    if (!genres) {
        return (
            <div>Loading Genres</div>
        )
    }

    return (

        <div className="genres justify-center container mg-auto flex gap-2 flex-wrap">
            {genres.map((item, index) => (
                <GenreButton key={index} genre={item}/>
            ))}
        </div>
    )
}
export default GenreList;
