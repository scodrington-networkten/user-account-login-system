import Utilities from "../../../utilities.jsx";
import SinglePersonSocialLinks from "@components/Pages/SinglePerson/SinglePersonSocialLinks.jsx";

const SinglePersonDetails = ({details, images, externalLinks}) => {

    const profileImage = Utilities.getApiImageUrl(details.profile_path, 'profile', 'w185');

    const getProfileImages = () => {
        return (
            <div className="profile-images grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
                {images?.profiles?.map((item, index) => {
                    const url = Utilities.getApiImageUrl(item.file_path ?? null, 'profile', 'w185');
                    return <img
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

            <h1 className="text-2xl lg:text-5xl mb-2 mb-4">{details.name}</h1>

            <aside className="main-profile-image col-span-2 float-left mr-4">
                <img src={profileImage} className="profile-image w-full mb-2"/>
            </aside>

            <section className="profile-information ">
                <div className="primary mb-4">
                    {details.place_of_birth && <p className="font-semibold">{details.place_of_birth}</p>}
                    {details.birthday && <p className="">{details.birthday}</p>}
                    {details.deathday && <p>{details.deathday}</p>}
                    {details.homepage && <p>{details.homepage}</p>}
                    {details.id && (
                        <p>
                            <a href={`https://www.imdb.com/name/${details.imdb_id}`}>IMDB Profile</a>
                        </p>
                    )}
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
