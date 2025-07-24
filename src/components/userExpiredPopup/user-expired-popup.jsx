import './user-expired-popup.css';
import {useNavigate} from "react-router-dom";

import {useUser} from "@contexts/UserContext.tsx";

/**
 * popup that shows a signin modal, when pressed redirects back to login and updtes user state to ensure
 * popup isnt displayed again
 * @returns {JSX.Element|null}
 * @constructor
 */
const UserExpiredPopup = () => {

    const {userExpired, setUserExpired} = useUser();
    const navigate = useNavigate();


    //redirect user to the login page and reset
    const onLoginButtonPress = (e) => {
        setUserExpired(false);
        navigate("/login");
    }

    if (!userExpired) return null;

    return (
        <div className="user-expired-popup">
            <div className="background"></div>
            <div className="popup">
                <p className="title">You've been logged out because of inactivity, <button
                    onClick={onLoginButtonPress}> please login again</button></p>
            </div>
        </div>
    )
}
export default UserExpiredPopup
