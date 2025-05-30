import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import SingleMovie from "../components/single-movie.jsx";
import LoadingCard from "../components/loading-card.jsx";

const SingleMoviePage = () => {

    //use state to manage data
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const result = await fetch(`/api/get-movie?id=${id}`);
                const data = await result.json();
                setMovie(data.json);

            } catch (err) {
                setError("Failed to fetch movie.");
            } finally {
                setLoading(false);
            }
        }
        getMovie();
    }, [id]);

    if (loading) return <LoadingCard/>;
    if (error) return <p>{error}</p>;
    if (!movie) return <p>No movie found.</p>;


    return <SingleMovie movie={movie} />;
}
export default SingleMoviePage;
