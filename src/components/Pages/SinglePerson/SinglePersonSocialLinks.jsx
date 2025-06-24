import Utilities from "../../../utilities.jsx";
import {useEffect, useState} from "react";

/**
 * Shows social media links for their given data
 * @param links
 * @returns {JSX.Element}
 * @constructor
 */
const SinglePersonSocialLinks = ({links = []}) => {

    const [socialMediaButtons, setSocialMediaButtons] = useState([]);

    //on load, collect social media data and create link buttons for each
    useEffect(() => {
        let temp = [];
        //map from object key name to extract data
        Object.entries(links).forEach(([type, data]) => {
            const button = Utilities.getSocialMediaButton(data, type);
            if (button) temp.push(button);
        });

        setSocialMediaButtons(temp);

    }, [links]);

    return (
        <section className="links flex flex-wrap gap-2 mb-4 flex-grow-1">
            {socialMediaButtons}
        </section>

    )
}
export default SinglePersonSocialLinks;
