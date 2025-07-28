import './actorProfile.css';
import Utilities from "../../utilities";
import {useState, JSX} from "react";
import {useNavigate} from "react-router-dom";
import slugify from "slugify";
import {Actor} from "@contracts/actor";

/**
 * Single card for displaying an actor
 * @param actor
 * @returns {JSX.Element}
 * @constructor
 */

type ActorProfileProps = {
    actor: Actor
}
const ActorProfile = ({actor}: ActorProfileProps) => {


    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const setIsHoveredState = (state: boolean) => {
        setIsHovered(state);
    }

    const onProfileCardClicked = () => {
        const slugifiedName = slugify(actor.original_name, {lower: true, strict: true});
        navigate(`/person/${actor.id}/${slugifiedName}`);
    }

    /**
     * Gets the image of the actor, factoring in when an actor has no image
     */
    const getActorProfileImage = (): JSX.Element => {

        let profileUrl;
        if (actor.profile_path !== null) {
            profileUrl = Utilities.getApiImageUrl(actor.profile_path, {type: 'profile', size: 'w185'});

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
                <div className="triangle "/>
                <p className="name">{actor.original_name}</p>
                <p className="character">({actor.character})</p>
            </div>
        </div>
    )


}
export default ActorProfile;
