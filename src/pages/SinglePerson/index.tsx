import {useParams} from "react-router-dom";
import {JSX, useEffect, useState} from "react";


import SinglePersonMovies from "@components/Pages/SinglePerson/SinglePersonMovies";
import SinglePersonDetails from "@components/Pages/SinglePerson/SinglePersonDetails";
import LoadingCard from "@components/loading-card";
import {Helmet} from "react-helmet";
import Utilities from "../../utilities";
import {Person} from "@contracts/Person";
import {MovieResult} from "@contracts/movieResult";
import {Image} from "@contracts/Image";
import {ExternalIds} from "@contracts/externalIds";

/**
 * Shows information about a single person
 * @returns {JSX.Element}
 * @constructor
 */
const SinglePerson = (): JSX.Element => {

    //extract id and name
    const {id = '', name = ''} = useParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [person, setPerson] = useState<Person | null>(null);
    const [movieData, setMovieData] = useState<{
        cast: MovieResult[],
        crew: MovieResult[]
    }>({
        cast: [],
        crew: []
    });
    const [images, setImages] = useState<Image[]>([]);
    const [externalLinks, setExternalLinks] = useState<ExternalIds>({});

    //load information about the single person
    useEffect(() => {

        (async function apiCall() {

            try {
                setError(false);
                setLoading(true);

                const result = await fetch('/api/get', {
                    headers: {
                        'x-action': 'get-details-for-person',
                        'person-id': id?.toString()
                    }
                })

                if (!result.status) {
                    throw new Error("There was an error collection information for this person");
                }

                const data: Person = await result.json();

                //set profile image data
                if (data.images.profiles) {
                    setImages(data.images.profiles);
                }

                //set related movies they were a cast or crew member in
                if (data.movie_credits) {
                    setMovieData(data.movie_credits);
                }

                //set external social media links
                if (data.external_ids) {
                    setExternalLinks(data.external_ids);
                }

                //set main person object
                setPerson(data);
            } catch (error) {
                setError(true);
                window.showToastNotification((error as Error).message, 'error');
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
                <SinglePersonDetails details={person} movies={movieData} images={images} externalLinks={externalLinks}/>
                <SinglePersonMovies movies={movieData}/>
            </div>
        </>

    )
}
export default SinglePerson;
