import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "@contexts/UserContext";
import {useEffect} from "react";

/**
 * Ensure we have access to the user object (user logged in)
 * @constructor
 */
const PrivateRoute = () => {

    const {user, userLoading} = useUser();

    console.log(userLoading);
    console.log(user);

    //user state still loading
    if (userLoading) return (
        <div>Loading...</div>
    )
    //user isnt logged in, redirect
    if (!user) {
        return <Navigate to="/login" replace/>
    }

    return <Outlet/>
}
export default PrivateRoute
