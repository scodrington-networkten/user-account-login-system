import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SingleMovie from "@components/singleMovie/single-movie";
import LoadingCard from "@components/loading-card";
import Utilities from "../utilities";
import {Movie} from "@contracts/movie";

const SingleMoviePage = () => {

    //use state to manage data
    const {id = ''} = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {

        //collect movie
        (async () => {

            try {
                setLoading(true);
                setError(false);
                const result = await Utilities.getMovie(id);
                setMovie(result);

            } catch (error) {
                setError(false);
                window.showToastNotification((error as Error).message, 'error');
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
