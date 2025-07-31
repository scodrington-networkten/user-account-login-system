/**
 * Standard layout, with title at the top and content below
 * @param children
 * @param title
 * @returns {JSX.Element}
 * @constructor
 */
import React, {JSX} from "react";

type StandardLayoutPros = React.PropsWithChildren<{
    title: string
}>
/**
 * Standard layout, used by most pages with a title + content separated into a top/bottom layout
 * @param children
 * @param title
 * @constructor
 */
const StandardLayout = ({children, title = 'Page title'}: StandardLayoutPros): JSX.Element => {

    return (

        <div className="flex flex-wrap gap-4">
            <div className="top w-full flex flex-col gap-4">
                <h1 className="text-3xl lg:text-4xl mb-2 lg:mb-4">{title}</h1>
            </div>
            <div className="bottom w-full flex flex-col gap-4">
                {children}
            </div>
        </div>
    )
}
export default StandardLayout;
