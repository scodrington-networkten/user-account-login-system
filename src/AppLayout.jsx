import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {useEffect, useRef} from "react";
import {Outlet} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import MiniSearchForm from "@components/miniSearchForm/miniSearchForm.jsx";

const AppLayout = ({children, contextOffset = false}) => {

    const location = useLocation();

    //on load / location change, setup the negative margin if the main content requires it to sit under the header correctly
    useEffect(() => {
        const updateMainContentMargin = () => {
            const header = document.getElementById("page-header");
            const mainContent = document.getElementById("page-content");

            console.log(header);
            console.log(mainContent)

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
    }, [location.pathname]);


    return (
        <div className="flex flex-col">
            <Header/>
            <main
                className={`page-content flex-grow flex flex-col mx-auto w-full gap-4 items-start ${contextOffset ? 'offset' : ''}`}
                id="page-content">
                <Outlet/>
            </main>
            <Footer/>
            <MiniSearchForm/>
        </div>
    )


}
export default AppLayout;
