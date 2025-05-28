import {useParams} from "react-router-dom";
import SingleMovie from "../components/single-movie.jsx";
const SingleMoviePage = () => {

    let {id} = useParams();
    id = 1160956;

    let movie = {
        "adult": false,
        "backdrop_path": "/dXoBFj9Yl9HDRcDVQubkuVCh26N.jpg",
        "genre_ids": [
            28,
            35
        ],
        "id": 1160956,
        "original_language": "zh",
        "original_title": "熊猫计划",
        "overview": "International action star Jackie Chan is invited to the adoption ceremony of a rare baby panda, but after an international crime syndicate attempts to kidnap the bear, Jackie has to save the bear using his stunt work skills.",
        "popularity": 35.386,
        "poster_path": "/8iMPQl13q89jQhaA5nXb6UiT0t0.jpg",
        "release_date": "2024-10-01",
        "title": "Panda Plan",
        "video": false,
        "vote_average": 6.849,
        "vote_count": 192
    }

    //connect to API and pull information about this movie
    

    return (
        <SingleMovie movie={movie}/>
    )
}
export default SingleMoviePage;
