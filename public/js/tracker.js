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
        const body = JSON.stringify(payload);
        let sent = false;
        if (navigator.sendBeacon) {
            try {
                sent = navigator.sendBeacon(TRACKING_ENDPOINT, new Blob([body], { type: 'application/json' }));
            } catch (e) { sent = false; }
        }
        if (!sent) {
            fetch(TRACKING_ENDPOINT, {
                method: 'POST',
                body: body,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                keepalive: true
            }).catch(() => {});
        }
    } catch (e) { /* silent */ }
}
