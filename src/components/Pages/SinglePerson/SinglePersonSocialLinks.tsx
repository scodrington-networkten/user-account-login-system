import Utilities, {SocialMediaType} from "../../../utilities";
import {JSX, useEffect, useState} from "react";
import {ExternalIds} from "@contracts/externalIds";

/**
 * Shows social media links for their given data
 * @param links
 * @returns {JSX.Element}
 * @constructor
 */
type SinglePersonSocialLinksProps = {
    links: ExternalIds
}
//touple of media type to string
type SocialEntry = [SocialMediaType, string];
const SinglePersonSocialLinks = ({links}: SinglePersonSocialLinksProps) => {

    const [socialLinks, setSocialLinks] = useState<SocialEntry[]>([]);

    //on load, collect social media data and create link buttons for each
    useEffect(() => {

        const validLinks: SocialEntry[] = [];

        //extract the media type and data (url) from the entries
        Object.entries(links).forEach(([type, data]) => {
            if (!data) return;
            validLinks.push([type as SocialMediaType, data]);
        });

        setSocialLinks(validLinks);

    }, [links]);

    return (
        <section className="links flex flex-wrap gap-2 mb-4 flex-grow-1">
            {
                socialLinks.map(([type, data]: SocialEntry) =>
                    Utilities.getSocialMediaButton(data, type)
                )}
        </section>

    )
}
export default SinglePersonSocialLinks;
