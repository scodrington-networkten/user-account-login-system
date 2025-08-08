import React, {useEffect} from "react";
import {useUser} from "@contexts/UserContext";
import {useNavigate} from "react-router-dom";

const Logout = () => {

    const {logout} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate("/login");
    }, []);


    return null;

}
export default Logout;
