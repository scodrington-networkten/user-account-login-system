import Header from "./Header";
import Footer from "./Footer";
import React, {useEffect, useRef} from "react";
import {Outlet} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import MiniSearchForm from "@components/miniSearchForm/miniSearchForm.jsx";
import {useSharedState} from "@contexts/SharedStateConext";
import "./app-layout.css";

type AppLayoutType = "homepage" | "standard";
type AppLayoutProps = {
    contextOffset: boolean,
    layoutType: AppLayoutType
}
const AppLayout = ({contextOffset = false, layoutType = "standard"}: AppLayoutProps) => {

    const location = useLocation();
    const {genreSubnavOpen} = useSharedState();

    /**
     *  set-up the negative margin if the main content requires it to sit under the header correctly
     *  - triggers on load / location change,
     *  - triggers when the genreSubnav has been opened or closed as it adds height to the header
     */
    useEffect(() => {
        const updateMainContentMargin = () => {
            const header = document.getElementById("page-header");
            const mainContent = document.getElementById("page-content");
            if (!header || !mainContent) return;

            const headerHeight = header.offsetHeight;

            //offset the content if needed
            if (mainContent.classList.contains('offset')) {
                mainContent.style.marginTop = `-${headerHeight}px`;
            } else {
                mainContent.style.marginTop = '0px';
            }
        };

        updateMainContentMargin(); // initial run
        window.addEventListener("resize", updateMainContentMargin);

        return () => {
            window.removeEventListener("resize", updateMainContentMargin);
        };
    }, [location.pathname, genreSubnavOpen]);


    //determine if we're using the standard template, if so we need an inner container
    let innerClass = layoutType == "standard" ? "container mx-auto px-4" : '';

    /**
     * Gets the outpt based on template typ
     */
    const getDisplay = () => {
        if (layoutType == "standard") {

            return (
                <div className="flex flex-col">
                    <Header/>
                    <main
                        className={`page-content flex-grow flex flex-col mx-auto w-full items-start ${contextOffset ? 'offset' : ''}`}
                        id="page-content">
                        <div className={innerClass}>
                            <Outlet/>
                        </div>
                    </main>
                    <Footer/>
                    <MiniSearchForm/>
                </div>
            )
        } else {

            return (
                <div className="flex flex-col">
                    <Header/>
                    <main
                        className={`page-content flex-grow flex flex-col mx-auto w-full items-start ${contextOffset ? 'offset' : ''}`}
                        id="page-content">
                        <Outlet/>
                    </main>
                    <Footer/>
                    <MiniSearchForm/>
                </div>
            )
        }
    }

    return (
        getDisplay()
    )


}
export default AppLayout;
