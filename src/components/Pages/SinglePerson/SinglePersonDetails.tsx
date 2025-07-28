import Utilities from "../../../utilities";
import SinglePersonSocialLinks from "@components/Pages/SinglePerson/SinglePersonSocialLinks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import {faMapPin, faBirthdayCake, faCamera, faClapperboard} from "@fortawesome/free-solid-svg-icons";

import {Person} from "@contracts/Person";
import {Image} from "@contracts/Image";
import {MovieResult} from "@contracts/movieResult";
import {ExternalIds} from "@contracts/externalIds";
import {JSX} from "react";

type SinglePersonDetailsProps = {
    details: Person,
    images: Image[],
    movies: {
        cast: MovieResult[],
        crew: MovieResult[]
    },
    externalLinks: ExternalIds
}
const SinglePersonDetails = ({details, images, movies, externalLinks}: SinglePersonDetailsProps): JSX.Element => {

    /**
     * Returns multiple images of the person, these are alternative images
     */
    const getProfileImages = () => {
        return (
            <div className="profile-images grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4 w-full">
                {images.map((item, index) => {
                    const url = Utilities.getApiImageUrl(item.file_path ?? null, {type: 'profile', size: 'w185'});
                    return <img
                        key={`profile-image-${index}`}
                        className="w-full"
                        src={url}
                        alt={`Image of ${details.name}`}
                    />
                })}
            </div>
        )
    }

    return (
        <article className="details items-start block">
            <h1 className="text-2xl lg:text-5xl mb-4">{details.name}</h1>
            <aside className="main-profile-image col-span-2 float-left mr-4">
                <img
                    alt={`Photo of ${details.name}`}
                    src={Utilities.getApiImageUrl(details.profile_path, {type: 'profile', size: 'w185'})}
                    className="profile-image w-full mb-2"
                />
            </aside>

            <section className="profile-information ">
                <div className="primary mb-4 flex flex-col gap-1">
                    {details.place_of_birth &&
                        <p className="font-semibold">
                            <FontAwesomeIcon icon={faMapPin}/> {details.place_of_birth}
                        </p>}
                    {details.birthday &&
                        <p className="">
                            <FontAwesomeIcon icon={faBirthdayCake}/> {details.birthday}
                        </p>
                    }
                    {details.deathday &&
                        <p>
                            <FontAwesomeIcon icon={faCalendar}/> {details.deathday}
                        </p>
                    }
                    {details.homepage &&
                        <p>
                            <a href={details.homepage} className="button">View Website</a>
                        </p>
                    }
                    {movies?.cast?.length > 0 &&
                        <p>
                            <FontAwesomeIcon icon={faCamera}/> Appeared in {movies?.cast?.length} movies
                        </p>
                    }
                    {movies?.crew?.length > 0 &&
                        <p>
                            <FontAwesomeIcon icon={faClapperboard}/> Directed {movies?.crew?.length} movies
                        </p>
                    }
                </div>
                <section className="social-media-links flex flex-wrap clear-left md:clear-none">
                    <SinglePersonSocialLinks links={externalLinks}/>
                </section>
                <section className="profile-bio col-span-full font-light">{details.biography}</section>
            </section>
            {getProfileImages()}
        </article>

    )
}
export default SinglePersonDetails;
