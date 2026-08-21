document.addEventListener('DOMContentLoaded', function() {
    const name = localStorage.getItem('userName') || 'there';
    const message = document.getElementById('birthdayMessage');
    message.textContent = `Happy Birthday ${name}!`;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
        for (let i = 0; i < 120; i++) {
            setTimeout(createConfetti, Math.random() * 2500);
        }
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        const size = 6 + Math.random() * 8;
        confetti.style.width = size + 'px';
        confetti.style.height = size * (Math.random() > 0.5 ? 1 : 0.4) + 'px';
        confetti.style.opacity = 0.5 + Math.random() * 0.5;
        confetti.style.animationDuration = (2.5 + Math.random() * 3) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 7000);
    }
});
