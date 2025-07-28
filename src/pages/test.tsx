// @ts-ignore
import sampleData from "../sampleData.js";
import MovieCard from "@components/movieCard/movie-card";
import {MovieResult} from "@contracts/movieResult";

const Test = () => {

    let movies: MovieResult[] = sampleData.results;
    return (
        <div className="container mx-auto px-4 py-4 flex gap-2 flex-col">
            {movies.map((item, index) => {
                return <MovieCard movie={item} classes='movie-card-alternate' key={index}/>
            })}

        </div>
    )
}
export default Test;
