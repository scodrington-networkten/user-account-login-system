import {useState} from "react";
import './toast-notification.css';

/**
 * Shows a simple toast notification when called externally
 * @constructor
 */
const ToastNotification = () => {

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    //Show a toast message
    window.showToastNotification = (message, type = '', duration = 3000) => {

        setMessageType(type);
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, duration);
    }

    if (!message) return;
    return (
        <div className={`toast-notification ${messageType}`}>
            <p className="notification">{message}</p>
        </div>
    )

}
export default ToastNotification
