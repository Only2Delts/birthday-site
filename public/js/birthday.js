document.addEventListener('DOMContentLoaded', function() {
    const name = localStorage.getItem('userName') || 'there';
    document.getElementById('birthdayMessage').textContent = `Happy Birthday ${name}!`;
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.textContent = isDark ? '☀️' : '🌓';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});