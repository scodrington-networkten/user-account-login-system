import React from "react";
import {useState, useEffect} from "react";
import GenreButton from "./genre-button.jsx";

/**
 * Shows a list of genres, pulled from the API
 * @returns {JSX.Element}
 * @constructor
 */
const GenreList = () => {

    const [genres, setGenres] = useState([]);
    useEffect(() => {

        const getGenreData = async () => {
            const response = await fetch('/api/get-genres');
            const result = await response.json();

            //collect data about genres
            let genreData = result.data.genres.map((item, index) => {
                return {name: item.name, id: item.id}
            });

            setGenres(genreData);
        }
        getGenreData();


    }, [])


    return (
        <>
            <div>
                <div className="genres flex gap-2 flex-wrap">
                    {genres.map((item, index) => (
                        <GenreButton key={index} genre={item}/>
                    ))}
                </div>
            </div>
        </>
    )
}
export default GenreList;
