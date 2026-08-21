window.onload = function() {
    const name = localStorage.getItem('userName') || 'there';
    document.getElementById('birthdayMessage').textContent = `Happy Birthday ${name}`;
};