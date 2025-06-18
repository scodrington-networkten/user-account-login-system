import {useState} from "react";
import './toast-notification.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceSmile, faFaceTired, faFaceSurprise } from "@fortawesome/free-solid-svg-icons";

/**
 * Shows a simple toast notification when called externally
 * @constructor
 */
const ToastNotification = () => {

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const iconMap = {
        error: faFaceTired,
        warning: faFaceSurprise,
        success: faFaceSmile,
    };

    /**
     *
     * @param message
     * @param {'warning' | 'error' | 'success'} type - the type of message to be used
     * @param duration
     */
    //Show a toast message
    window.showToastNotification = (message, type = 'warning', duration = 3000) => {

        setMessageType(type);
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, duration);
    }

    if (!message) return;

    let actionIcon = iconMap[messageType];

    return (
        <div className={`toast-notification ${messageType}`}>
            <p className="notification">{message} <FontAwesomeIcon icon={actionIcon}/></p>
        </div>
    )

}
export default ToastNotification
