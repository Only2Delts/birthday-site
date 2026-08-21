document.addEventListener('DOMContentLoaded', function() {
    const name = localStorage.getItem('userName') || 'there';
    const message = document.getElementById('birthdayMessage');

    message.textContent = `Happy Birthday ${name}!`;

    // Wrap the name in a gradient span
    message.innerHTML = `Happy Birthday <span class="name-shine">${name}</span>!`;

    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1', '#f368e0', '#00d2d3'];
    for (let i = 0; i < 150; i++) {
        setTimeout(createConfetti, Math.random() * 2500);
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        const type = Math.random() > 0.5 ? 'confetti' : 'confetti balloon';
        confetti.className = type === 'confetti' ? 'confetti' : 'confetti-balloon';
        confetti.style.left = Math.random() * 100 + 'vw';
        if (type === 'confetti') {
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const size = 6 + Math.random() * 8;
            confetti.style.width = size + 'px';
            confetti.style.height = size * (Math.random() > 0.5 ? 1 : 0.4) + 'px';
            confetti.style.animationDuration = (2.5 + Math.random() * 3) + 's';
        } else {
            confetti.style.background = `radial-gradient(circle at 30% 30%, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
            confetti.style.animationDuration = (4 + Math.random() * 3) + 's';
        }
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 7000);
    }
});
