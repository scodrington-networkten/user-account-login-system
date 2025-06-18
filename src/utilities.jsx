import _ from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkFull, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarFull, faStarHalfAlt as faStarHalf} from '@fortawesome/free-solid-svg-icons';
import {faBookmark as faBookmarkEmpty, faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';


class Utilities {

    /**
     * Round a given value to a step e.g 0.5
     * @param value
     * @param step
     * @returns {number}
     */
    round(value, step) {
        step || (step = 1.0);
        let inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }

    /**
     * Format the date into something more useful
     *
     * @param dateString - raw datetime string to be converted
     * @param showTime - append the time info such as 12:35PM
     * @returns {string}
     */
    formatDate = (dateString, showTime = false) => {

        if (_.isEmpty(dateString)) {
            console.log('an empty date string was passed');
            return '';
        }

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const year = date.getFullYear();

        //factor in time aspects
        let hours = date.getHours();
        const hour = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = (hours >= 12) ? 'PM' : 'AM';
        const timeComponent = showTime ? `${hour}:${minutes}${ampm}` : '';

        return `${day}/${month}/${year} ${timeComponent}`;

    }

    /**
     * Given two dates, return the number of hours between them
     * @param date1
     * @param date2
     * @returns {number}
     */
    getDateDifferenceHours(date1, date2) {

        const difference = (new Date(date2)).getTime() - (new Date(date1)).getTime();
        return difference / (1000 * 60 * 60);
    }

    /**
     * gets the rating section, showing the movie score out of 5 stars
     *
     * @param voteAverage
     * @returns {JSX.Element}
     */
    getStarsSection(voteAverage) {

        //convert from a score of 0-10 to 0-5
        let baseScore = (voteAverage / 2);
        //round to the nearest 0.5
        let newScore = new Utilities().round(baseScore, 0.5);
        //determine what icons to use
        let iconsArray = this.getStarIcons(newScore);

        return (
            <section className="stars-information">
                {
                    iconsArray.map((item, index) => {
                        return <span className="item text-[var(--color-highlight-primary)]"
                                     key={`star-${index}`}><FontAwesomeIcon icon={item}/></span>
                    })
                }
            </section>
        );
    }

    /**
     * Given a rating out of 5, determine if it should be a full, empty or half star based on its value
     * @param rating
     * @returns {unknown[]}
     */
    getStarIcons(rating) {

        const result = Array.from({length: 5}, (item, index) => {
            const slot = index + 1;
            if (rating >= slot) {
                return faStarFull;
            } else if (rating >= slot - 0.5) {
                return faStarHalf;
            } else {
                return faStarEmpty;
            }
        });
        return result;
    }

    /**
     * Shows the total number of people giving this a thumbs up
     * @param votes
     * @returns {JSX.Element}
     */
    getVotesSection(votes) {

        return (
            <section className="vote-information flex gap-2 justify-center">
                <span className="vote-icon text-[var(--color-highlight-primary)]">
                    <FontAwesomeIcon icon={faThumbsUp}/>
                </span>
                <span className="vote-score">
                    {votes}
                </span>

            </section>
        )

    }


    getTrimmedString(string, maxCharacters = 200) {

        return _.truncate(string, {
            length: maxCharacters
        });

    }

    /**
     * Builds a TMDB image URL using the provided image type and size.
     *
     * @param {string} url - The path of the image (e.g., "/abc123.jpg").
     * @param {"backdrop"|"logo"|"poster"|"profile"|"still"} type - The category of the image.
     * @param {string} size - The size of the image (e.g., "w185", "original"). Must be a valid size for the given type.
     * @returns {string} A fully qualified image URL.
     */
    static getApiImageUrl(url, type, size) {

        //defines the values the API expects
        const imagesSizes = {
            backdrop: ["w300", "w780", "w1280", "original"],
            logo: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
            poster: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
            profile: ["w45", "w185", "h632", "original"],
            still: ["w92", "w185", "w300", "original"]
        }

        //verify the type value passed
        if (!imagesSizes.hasOwnProperty(type)) {
            let allowedTypes = Object.keys(imagesSizes).map((item) => {
                return item
            });
            throw new Error(`Invalid type of image supplied: ${type}. Allowed values include: ${allowedTypes}`);
        }

        //verify the size value passed for the given type
        if (!imagesSizes[type].includes(size)) {
            let allowedSizes = imagesSizes[type].map((item) => {
                return item
            });
            throw new Error(`Invalid size of image supplied: ${size}. Allowed values include: ${allowedSizes}`);
        }

        //determine the url
        if (typeof url !== 'string' || url.trim() === '') {

            if (['poster', 'profile'].includes(type)) {
                return '/portrait_default_image.svg';
            } else {
                return '/profile_image_blank.webp';
            }

            throw new Error(`url provided must be non empty and a string`);
        }

        //get the URL based on values
        return `https://image.tmdb.org/t/p/${size}${url}`;

    }
}

export default Utilities;
