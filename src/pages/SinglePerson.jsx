import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

/**
 * Shows information about a single person
 * @returns {JSX.Element}
 * @constructor
 */
const SinglePerson = () => {

    //extract id and name
    const {id, name} = useParams();


    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [person, setPerson] = useState(null);
    const [movies, setMovies] = useState(null);
    const [externalLinks, setExternalLinks] = useState(null)

    useEffect(() => {

        (async function apiCall() {

            try {
                setError(false);
                setLoading(true);

                const result = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-details-for-person',
                        'person-id': 5521983
                    }
                })

                if (!result.status) {
                    throw new Error("There was an error collection information for this person");
                }

                const data = await result.json();

                //extract the base user data (discarding the credits and ids from the object)
                const {movie_credits, external_ids, ...personData} = data;

                setPerson(personData);
                setMovies(data.movie_credits);
                setExternalLinks(data.external_ids);

                console.log(data);
                console.log(personData);

            } catch (error) {
                setError(true);
                window.showToastNotification(error.message);
            } finally {
                setLoading(false);
            }
        })();

    }, [id, name]);


    if (loading) {
        return (
            <div className="container mx-auto mt-2 mb-2">
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto mt-2 mb-2">
                There was an error collecting information about this person
            </div>
        )
    }

    const getPersonDetails = () => {
        return <p>Details</p>
    }

    const getMovies = () => {
        return <p>Movies</p>;
    }


    return (
        <div className="container mx-auto mt-2 mb-2">
            <section className="person-details">
                {getPersonDetails()}
            </section>
            <section className="movies">
                {getMovies()}
            </section>
        </div>

    )
}
export default SinglePerson;
