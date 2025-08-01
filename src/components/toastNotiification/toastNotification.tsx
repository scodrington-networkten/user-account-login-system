import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faFaceTired, faFaceSurprise } from "@fortawesome/free-solid-svg-icons";
import type { ToastNotificationType } from "@contracts/ToastNotification";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import './toast-notification.css';

const ToastNotification = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<ToastNotificationType>('warning');

    const iconMap: Record<ToastNotificationType, IconDefinition> = {
        error: faFaceTired,
        warning: faFaceSurprise,
        success: faFaceSmile,
    };

    useEffect(() => {
        window.showToastNotification = (message, type = 'warning', duration = 3000) => {
            setMessageType(type);
            setMessage(message);
            setTimeout(() => setMessage(''), duration);
        };
    }, []);

    if (!message || !iconMap[messageType]) return null;

    return (
        <div className={`toast-notification ${messageType}`}>
            <p className="notification">
                {message} <FontAwesomeIcon icon={iconMap[messageType]} />
            </p>
        </div>
    );
};

export default ToastNotification;
