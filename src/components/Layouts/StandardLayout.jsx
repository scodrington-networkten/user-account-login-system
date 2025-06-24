/**
 * Standard layout, with title at the top and content below
 * @param children
 * @param title
 * @returns {JSX.Element}
 * @constructor
 */
const StandardLayout = ({children, title = 'Page title'}) => {

    return (
        <div className="container mx-auto mt-2 mb-2 p-4">
            <div className="flex flex-wrap  gap-4">
                <div className="top w-full">
                    <h1 className="text-3xl lg:text-4xl mb-2 lg:mb-4">{title}</h1>
                </div>
                <div className="bottom w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default StandardLayout;
