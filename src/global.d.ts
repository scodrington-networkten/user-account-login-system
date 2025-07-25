export {};

import {ToastNotificationFunction} from "@contracts/ToastNotification";

declare global {
    interface Window {
        showToastNotification: ToastNotificationFunction
    }
}
