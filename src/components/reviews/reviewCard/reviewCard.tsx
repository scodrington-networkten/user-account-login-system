import Utilities from "../../../utilities";
import './review-card.css';
import React, {JSX} from "react";
import {Review} from "@contracts/Review";

/**
 * Single card for showing a review
 * @param review
 * @returns {JSX.Element}
 * @constructor
 */

type ReviewCardProps = {
    review: Review
}
const ReviewCard = ({review}: ReviewCardProps) => {


    const getAuthorName = (): string => {

        let {name, username} = review.author_details;

        if (name) {
            return `${username} (${name})`;
        } else {
            return `${username}`;
        }
    }


    /**
     * Return the review content
     */
    const getReviewContent = (): string => {
        return (review.content.length > 200) ? Utilities.getTrimmedString(review.content, 200) : review.content;
    }

    /**
     * Return the formatted review date
     */
    const getReviewDate = (): string => {

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
     * Get the review stars section (out of 5 stars)
     */
    const getStarsContent = (): JSX.Element | null => {

        if (review.author_details.rating === null) return null;

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
