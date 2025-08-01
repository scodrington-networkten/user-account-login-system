// Ensure window exists (in case of SSR or testing)
if (typeof window !== 'undefined') {
    // Assign a placeholder function so it's never undefined
    window.showToastNotification = function (message, type = 'warning', duration = 3000) {
        console.warn("Toast not ready:", message, type, duration);
    };
}
