/**
 * Standard layout, with title at the top and content below
 * @param children
 * @param title
 * @returns {JSX.Element}
 * @constructor
 */
import React, {JSX} from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import MiniSearchForm from "@components/miniSearchForm/miniSearchForm";
import "./standard-layout.css";

type StandardLayoutPros = React.PropsWithChildren<{
    title?: string
}>
/**
 * Standard layout, used by most pages with a title + content separated into a top/bottom layout
 * @param children
 * @param title
 * @constructor
 */
const StandardLayout = ({children, title = ''}: StandardLayoutPros): JSX.Element => {

    return (
        <div className="standard-layout ">
            <main>
                <div className="top ">
                    {title &&
                        <h1 className="title">{title}</h1>
                    }
                </div>
                <div className="bottom">
                    {children}
                </div>
            </main>
        </div>
    )
}
export default StandardLayout;
