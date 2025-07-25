/**
 * Definition for the toast notification function we attach to window
 */

export type ToastNotificationType = 'warning' | 'error' | 'success';

export type ToastNotificationFunction = (
    message: string,
    type?: ToastNotificationType,
    duration?: number
) => void;



