import LoadingCard from "./loading-card.jsx";

const LoadingCardList = () => {

    const getLoadingCards = () => {

        let i = 0;
        let loadingCards = [];

        while (i < 20) {
            loadingCards.push(<LoadingCard key={`loading-card-${i}`}/>);
            i++;
        }

        return loadingCards;

    }

    return (
        <section className="loading-list grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
            {getLoadingCards()}
        </section>
    )
}
export default LoadingCardList;
