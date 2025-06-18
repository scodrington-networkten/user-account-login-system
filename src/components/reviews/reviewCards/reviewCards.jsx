import exampleReviews from "@components/reviews/reviewCard/exampleReviews.js";
import {useEffect, useState} from "react";
import ReviewCard from "@components/reviews/reviewCard/reviewCard.jsx";
import './review-cards.css';

const ReviewCards = ({movie}) => {
    
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        setReviews(exampleReviews.results);
    }, [])

    if (reviews.length === 0) {
        return (
            <p>There are no reviews for this movie yet</p>
        )
    }

    return (
        <div className="review-cards mt-4">
            <h3 className="mb-4 text-3xl">Reviews</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {reviews.map((review, index) => {
                    return <ReviewCard review={review} key={`review-card-${index}`}/>
                })}
            </div>
        </div>
    )
}
export default ReviewCards;
