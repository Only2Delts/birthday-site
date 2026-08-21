const TRACKING_ENDPOINT = 'https://birthday-site-tracker.onrender.com/track';

function trackVisit(page) {
    const payload = {
        page: page,
        name: localStorage.getItem('userName') || null,
        theme: localStorage.getItem('theme') || null,
        referrer: document.referrer || 'direct',
        screen: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    try {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        if (navigator.sendBeacon) {
            navigator.sendBeacon(TRACKING_ENDPOINT, blob);
        } else {
            fetch(TRACKING_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
                keepalive: true
            }).catch(() => {});
        }
    } catch (e) { /* silent */ }
}
