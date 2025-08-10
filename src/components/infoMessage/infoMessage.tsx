import {JSX} from "react";
import {faSadCry} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./info-message.css";

type InfoMessageProps = {
    message: string
}
const InfoMessage = ({message}: InfoMessageProps): JSX.Element => {
    return (
        <div className="info-message">
            <span><FontAwesomeIcon className="icon" icon={faSadCry}></FontAwesomeIcon>{message}</span>
        </div>
    )
}
export default InfoMessage
