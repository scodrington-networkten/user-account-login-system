import {useParams} from "react-router-dom";

const MoviesByGenre = () => {

    //extract genre token from the url
    const {genre} = useParams();

    return (
        <h1>this is the genre template for {genre}</h1>
    )
}
export default MoviesByGenre;
