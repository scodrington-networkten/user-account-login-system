export {};

import {ToastNotificationFunction} from "@types/ToastNotification";

declare global {
    interface Window {
        showToastNotification: ToastNotificationFunction
    }
}
