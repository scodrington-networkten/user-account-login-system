
import MovieCard from "@components/movieCard/movie-card.tsx";
import StandardSlider from "@components/standardSlider/standardSlider.jsx";
import {useEffect, useState} from "react";
import SampleData from "../sampleData.js";

const NewSlider = () => {

    return (
        <div className="container mx-auto px-4 flex gap-2 flex-col">
            <StandardSlider data={SampleData.results.slice(0,8)} header={"Featured Movies"}/>
        </div>
    )
}
export default NewSlider;
