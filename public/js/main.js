document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    if (name) {
        localStorage.setItem('userName', name);
        window.location.href = 'birthday.html';
    }
});