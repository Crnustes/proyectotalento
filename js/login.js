document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const forgotPassword = document.getElementById('forgotPassword');
    const registerLink = document.getElementById('registerLink');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        
        if (username === 'adm' && password === '1234') {
            window.location.href = '/dashboard.html';
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });

    cancelBtn.addEventListener('click', function() {
        loginForm.reset();
    });

    forgotPassword.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Funcionalidad de recuperación de contraseña no implementada.');
    });

    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Funcionalidad de registro no implementada.');
    });
});