import './actorProfile.css';
import Utilities from "../../utilities.jsx";
import {useState, useEffect} from "react";

/**
 * Single card for displaying an actor
 * @param actor
 * @returns {JSX.Element}
 * @constructor
 */

const ActorProfile = ({actor}) => {


    const [isHovered, setIsHovered] = useState(false);

    const setIsHoveredState = (state) => {
        setIsHovered(state);
    }

    const onProfileCardClicked = () => {
        setIsHovered((prevState) => {
            return !prevState;
        })
    }

    /**
     * Gets the image of the actor, factoring in when an actor has no image
     * @returns {JSX.Element}
     */
    const getActorProfileImage = () => {

        let profileUrl;
        if (actor.profile_path !== null) {
            profileUrl = Utilities.getApiImageUrl(actor.profile_path, 'profile', 'w185');

        } else {
            profileUrl = "/profile_image_blank.webp";
        }

        return <img
            src={profileUrl}
            alt={`${actor.original_name} (${actor.character})`}
            className="actor-image"
        />

    }

    return (
        <div
            className={`actor-profile-card ${isHovered ? 'active' : ''}`}
            onMouseEnter={() => setIsHoveredState(true)}
            onMouseLeave={() => setIsHoveredState(false)}
            onClick={onProfileCardClicked}
        >
            {getActorProfileImage()}


            <div className={`actor-hover-card`}>
                <div className="triangle " />
                <p className="name">{actor.original_name}</p>
                <p className="character">({actor.character})</p>
            </div>

        </div>
    )


}
export default ActorProfile;
