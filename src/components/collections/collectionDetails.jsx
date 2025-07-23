import {useEffect, useState} from "react";
import Utilities from "../../utilities";
import './collection-details.css';
import MovieCard from "@components/movieCard/movie-card.jsx";

const CollectionDetails = ({id}) => {


    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    if (!id) return null;

    //collect information about this collection
    useEffect(() => {

        (async () => {
            try {
                setError(false);
                setLoading(true);

                const result = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-collection',
                        'collection-id': id
                    }
                })

                if (!result.ok) {
                    const data = await result.json();
                    throw new Error(data.error);
                }

                const data = await result.json();
                setCollection(data);
               // console.log(data);

            } catch (error) {
                setError(true);
                window.showToastNotification(error.message, 'error');
            } finally {
                setLoading(false)
            }
        })();


    }, [id]);


    if (loading) {
        return (
            <p>Loading</p>
        )
    }

    if (error) {
        return (
            <p>There was an error fetching information about this collection</p>
        )
    }

    if(!collection) return;


    return (
        <section className="collection flex flex-col">
            <h3 className="main-title">Belongs to..</h3>
            <div className="collection-details">
                <div className="left">
                    <img
                        src={Utilities.getApiImageUrl(collection.poster_path, {type: 'poster',size: 'w342'})}
                        className="collection-image"
                        alt="collection image"
                    />
                </div>
                <div className="right">
                    <h4 className="title">{collection.name}</h4>
                    <p className="movie-count">{collection?.parts.length} Movies</p>
                    <p className="description">{collection.overview}</p>
                </div>


            </div>
            <div className="collection-items">
                {collection?.parts.map((item) => {
                    return <MovieCard movie={item}/>
                })}
            </div>
        </section>

    )
}
export default CollectionDetails;
