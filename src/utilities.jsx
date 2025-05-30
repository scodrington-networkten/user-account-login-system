import _ from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarFull, faStarHalfAlt as faStarHalf} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';


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
     * @param dateString
     * @returns {string}
     */
    formatDate = (dateString) => {

        if (_.isEmpty(dateString)) {
            console.log('an empty date string was passed');
            return '';
        }

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;

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
                        return <span className="item" key={`star-${index}`}><FontAwesomeIcon icon={item}/></span>
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
                <span className="vote-icon">
                    <FontAwesomeIcon icon={faThumbsUp}/>
                </span>
                <span className="vote-score">
                    {votes}
                </span>

            </section>
        )

    }
}

export default Utilities;
