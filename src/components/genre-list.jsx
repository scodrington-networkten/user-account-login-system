import React from "react";
import {useState, useEffect} from "react";

const GenreList = ({genres, onGenreClick}) => {

    return (
        <>
            <div>
                <div className="genres flex gap-2 flex-wrap">
                    {genres.map((item, index) => (
                        <span onClick={() => { onGenreClick(item) }} className="genre text-md bg-white text-gray-700 rounded border border-gray-400 px-3 py-1" key={index}>{item.name}</span>
                    ))}
                </div>
            </div>
        </>
    )
}
export default GenreList;
