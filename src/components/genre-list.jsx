import React from "react";
import {useState, useEffect} from "react";

const GenreList = ({genres, onGenreClick}) => {

    return (
        <>
            <div>
                <div className="genres">
                    {genres.map((item, index) => (
                        <span onClick={() => { onGenreClick(item) }} className="genre text-4xl" key={index}>{item}</span>
                    ))}
                </div>

            </div>
        </>
    )
}
export default GenreList;
