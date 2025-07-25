import {useState} from "react";
import './toast-notification.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceSmile, faFaceTired, faFaceSurprise} from "@fortawesome/free-solid-svg-icons";
import type {ToastNotificationFunction, ToastNotificationType} from "types/ToastNotification";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";

/**
 * Shows a simple toast notification when called externally
 * @constructor
 */
const ToastNotification = () => {

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<ToastNotificationType>('warning');

    const iconMap: Record<ToastNotificationType, IconDefinition> = {
        error: faFaceTired,
        warning: faFaceSurprise,
        success: faFaceSmile,
    };

    if (!message) return null;

    if (!iconMap.hasOwnProperty(messageType)) {
        return null;
    }


    //Show a toast message
    window.showToastNotification = ((message, type = 'warning', duration = 3000) => {

        setMessageType(type);
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, duration);
    }) as ToastNotificationFunction;

    const actionIcon = iconMap[messageType];

    return (
        <div className={`toast-notification ${messageType}`}>
            <p className="notification">{message} <FontAwesomeIcon icon={actionIcon}/></p>
        </div>
    )

}
export default ToastNotification
