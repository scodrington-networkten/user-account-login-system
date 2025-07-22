import exampleReviews from "@components/reviews/reviewCard/exampleReviews.js";
import {useEffect, useState} from "react";
import ReviewCard from "@components/reviews/reviewCard/reviewCard.jsx";
import './review-cards.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const ReviewCards = ({movie}) => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {

            setLoading(true);
            const result = await fetch(`/api/get`, {
                headers: {
                    'x-action': 'get-reviews-for-movie',
                    'movie-id': movie.id
                }
            });
            if (!result.ok) {
                window.showToastNotification('There was an error getting the reviews for this movie', 'error');
            } else {
                const data = await result.json();
                //setReviews(data.results);
            }
            setLoading(false);
        })();

    }, [movie])


    /**
     * Show review section based on current status
     * @returns {JSX.Element}
     */
    const showReviews = () => {

        if (reviews.length === 0) {
            return (
                <p>There are no reviews for this movie, check back later</p>
            )
        }

        if (loading) {
            return (
                <p><FontAwesomeIcon className="text-lg fa-spin" icon={faSpinner}/></p>
            )
        } else {
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {reviews.map((review, index) => {
                        return <ReviewCard review={review} key={`review-card-${index}`}/>
                    })}
                </div>
            )
        }

    }

    return (
        <div className="review-cards mt-4">
            <h3 className="mb-4 text-3xl font-light">Reviews</h3>
            {showReviews()}
        </div>
    )
}
export default ReviewCards;
