const TRACKING_ENDPOINT = 'https://birthday-site-tracker.onrender.com/pixel';

function trackVisit(page) {
    try {
        const params = new URLSearchParams({
            page: page,
            name: localStorage.getItem('userName') || '',
            theme: localStorage.getItem('theme') || '',
            referrer: document.referrer || 'direct',
            screen: window.screen.width + 'x' + window.screen.height,
            language: navigator.language || '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            t: Date.now()
        });
        const img = new Image();
        img.style.display = 'none';
        img.src = TRACKING_ENDPOINT + '?' + params.toString();
    } catch (e) { /* silent */ }
}
