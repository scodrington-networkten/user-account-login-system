
/**
 * Loading card, used to show that content is loading
 * @returns {JSX.Element}
 * @constructor
 */
const LoadingCard = () => {
    return (
        <article className="loading-card bg-white drop-shadow-lg px-4 py-6 ">
            <div className="flex gap-4 loading">
                <div className="flex justify-start flex-grow-1">
                    <div className="loading-square bg-gray-300 w-full py-12"></div>
                </div>
                <div className="flex flex-col justify-start gap-4 flex-grow-1">
                    <div className="loading-stripe bg-gray-300 py-4 px-4"></div>
                    <div className="loading-stripe bg-gray-300 py-4 px-4"></div>
                    <div className="loading-stripe bg-gray-300 py-4 px-4"></div>
                </div>
            </div>
        </article>
    )
}
export default LoadingCard;
