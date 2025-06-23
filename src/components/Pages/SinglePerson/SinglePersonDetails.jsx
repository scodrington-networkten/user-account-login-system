import Utilities from "../../../utilities.jsx";

const SinglePersonDetails = ({details, images}) => {


    const profileImage = Utilities.getApiImageUrl(details.profile_path, 'profile', 'w185');

    console.log(details);
    console.log(profileImage);
    console.log(images)

    const getProfileImages = () => {
        return (
            <div className="profile-images flex flex-col-2">
                {images?.profiles?.map((item, index) => {

                    const url = Utilities.getApiImageUrl(item.file_path ?? null, 'profile', 'w185');
                    return <img
                        src={url}
                        alt={`Image of ${details.name}`}
                    />

                })}
            </div>
        )
    }

    return (
        <section className="details flex flex-col gap-2">
            <h1 className="text-5xl">{details.name}</h1>
            <img src={profileImage} className="profile-image"/>
            <p>{details.place_of_birth}</p>
            <p>{details.birthday}</p>
            <p>{details.deathday}</p>
            <p>{details.biography}</p>
            <p>{details.homepage}</p>
            <p>IMDB {details.id}</p>
            {getProfileImages()}
        </section>
    )
}
export default SinglePersonDetails;
