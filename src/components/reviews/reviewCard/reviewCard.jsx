
import Utilities from "../../../utilities";
import './review-card.css';

/**
 * Single card for showing a review
 * @param review
 * @returns {JSX.Element}
 * @constructor
 */
const ReviewCard = ({review}) => {

    const utilities = new Utilities();

    console.log(review);

    /**
     *
     * @returns {`${*} (${*})`|`${*}`}
     */
    const getAuthorName = () => {

        let {name, username} = review.author_details;

        if (name) {
            return `${username} (${name})`;
        } else {
            return `${username}`;
        }
    }

    /**
     *
     * @returns {*|string}
     */
    const getReviewContent = () => {
        return (review.content.length > 200) ? Utilities.getTrimmedString(review.content, 200) : review.content;
    }

    /**
     *
     * @returns {string}
     */
    const getReviewDate = () => {

        let createdDate = Utilities.formatDate(review.created_at, true);
        let updatedDate = (review.updated_at) ? Utilities.formatDate(review.updated_at, true) : '';

        //if updated date, ensure proper delta between update and creation and show it next to the date
        if (updatedDate) {
            let hoursDifference = Utilities.getDateDifferenceHours(review.created_at, review.updated_at);
            if (hoursDifference !== null && hoursDifference >= 1) {
                return `${createdDate} (Updated at ${updatedDate})`;
            }
        }

        //else just show normal date
        return createdDate
    }

    /**
     * Get the review stars section
     */
    const getStarsContent = () => {

        if (review.author_details.rating === null) return;

        return (
            <div className="rating">
                {Utilities.getStarsSection(review.author_details.rating)}
            </div>
        )
    }

    return (
        <article className="review-card">
            <img
                className="image"
                alt={`Image of ${getAuthorName()}`}
                src={Utilities.getApiImageUrl(review.author_details.avatar_path, {type: 'poster', size: 'w154'})}
            />
            <div className="main-context">
                {getStarsContent()}
                <section className="author">
                    <p>{getAuthorName()}</p>
                </section>
                <div className="date">{getReviewDate()}</div>
                <section className="review">
                    <p> {getReviewContent()}</p>
                </section>
            </div>
        </article>

    )

}
export default ReviewCard;
