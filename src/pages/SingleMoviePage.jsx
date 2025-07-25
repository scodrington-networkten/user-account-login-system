import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SingleMovie from "../components/singleMovie/single-movie.jsx";
import LoadingCard from "@components/loading-card.tsx";
import Utilities from "../utilities";

const SingleMoviePage = () => {

    //use state to manage data
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        //collect movie
        (async () => {

            try {
                setLoading(true);
                const result = await Utilities.getMovie(id);
                setMovie(result);

                //now we have the movie set, fetch the movie by

            } catch (error) {
                window.showToastNotification(error.message, 'error');
            } finally {
                setLoading(false);
            }

        })();
    }, [id])


    if (loading) return (

        <div className="container mx-auto">
            <LoadingCard/>
        </div>

    )
    if (error) return <p>{error}</p>;
    if (!movie) return <p>No movie found.</p>;


    return <SingleMovie movie={movie}/>;
}
export default SingleMoviePage;
