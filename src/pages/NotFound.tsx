import StandardLayout from "@components/Layouts/StandardLayout";
import {JSX} from "react";

const NotFound = () : JSX.Element => {
    return (
        <StandardLayout title="Not Found">
            <p>The resource you requested could not be found, sorry about that</p>
        </StandardLayout>
    )
}
export default NotFound;
