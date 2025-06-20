import SampleData from "../sampleData.js";
import sampleData from "../sampleData.js";
import MovieCard from "@components/movieCard/movie-card.jsx";

const Test = () => {


    let movie = sampleData.results[0];



    return (
        <div className="container mx-auto px-4 py-4 flex gap-2 flex-col">
            {sampleData.results.map((item,index) => {
                return  <MovieCard movie={item} classes='movie-card-alternate' key={index}/>
            })}

        </div>
    )
}
export default Test;
