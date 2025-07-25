import LoadingCard from "./loading-card";
import {JSX} from "react";

/**
 *
 * @param cssClass - classes passed to the UI, determines grid
 * @param items - number of little cards to show
 * @returns {JSX.Element}
 * @constructor
 */

type LoadingCardListProps = {
    cssClass?: string,
    items?: number
}
const LoadingCardList = ({
                             cssClass = 'grid-cols-2 md:grid-cols-5',
                             items = 20
                         }: LoadingCardListProps) => {

    /**
     * Display X number of loading cards
     * @returns {*[]}
     */
    const getLoadingCards = () : JSX.Element[] => {

        let i = 0;
        let loadingCards = [];

        while (i < items) {
            loadingCards.push(<LoadingCard key={`loading-card-${i}`}/>);
            i++;
        }
        return loadingCards;
    }

    return (
        <section className="container m-auto">
            <section className={`loading-list grid gap-4 ${cssClass}`}>
                {getLoadingCards()}
            </section>
        </section>

    )
}
export default LoadingCardList;
