import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({showSpinner: false});

/**
 * Defines a loading progress tracker using nprogress, assesses location.pathname when it updates to start
 * the loading bar functionality
 * @returns {null}
 * @constructor
 */
const RouteProgressTracker = () => {

    const location = useLocation();

    useEffect(() => {

        NProgress.start();
        const timeout = setTimeout(() => {
            NProgress.done();
        }, 400);

        //on termination (navigation updating), clear the timeout
        return () => {
            clearTimeout(timeout);
        }

    }, [location.pathname]);

    return null;

}
export default RouteProgressTracker;
