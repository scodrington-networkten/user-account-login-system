import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";


import SinglePersonMovies from "@components/Pages/SinglePerson/SinglePersonMovies.jsx";
import SinglePersonDetails from "@components/Pages/SinglePerson/SinglePersonDetails.jsx";
import LoadingCard from "@components/loading-card.tsx";
import {Helmet} from "react-helmet";
import Utilities from "../../utilities";

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
    const [images, setImages] = useState(null);
    const [externalLinks, setExternalLinks] = useState(null)

    //load information about the single person
    useEffect(() => {

        (async function apiCall() {

            try {
                setError(false);
                setLoading(true);

                const result = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-details-for-person',
                        'person-id': id
                    }
                })

                if (!result.status) {
                    throw new Error("There was an error collection information for this person");
                }

                const data = await result.json();

                //extract the base user data (discarding the credits and ids from the object)
                const {movie_credits, external_ids, images, ...personData} = data;

                setPerson(personData);
                setExternalLinks(data.external_ids);
                setImages(data.images);
                setMovies(data.movie_credits);



            } catch (error) {
                setError(true);
                window.showToastNotification(error.message, 'error');
            } finally {
                setLoading(false);
            }
        })();

    }, [id, name]);


    if (!person || loading) {
        return (
            <div className="container px-4  mx-auto mt-2 mb-2">
                <LoadingCard/>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container px-4  mx-auto mt-2 mb-2">
                There was an error collecting information about this person
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>{Utilities.getSiteNameForPage(person.name)}</title>
            </Helmet>
            <div className="container px-4 mx-auto mt-2 mb-2">
                <SinglePersonDetails details={person} movies={movies} images={images} externalLinks={externalLinks}/>
                <SinglePersonMovies movies={movies}/>
            </div>
        </>

    )
}
export default SinglePerson;
