import {useEffect} from "react";
import {useUser} from "@contexts/UserContext.tsx";

const Logout = () => {

    const {logout} = useUser();

    useEffect(() => {
        logout();
    }, []);

    return null;
}
export default Logout;
