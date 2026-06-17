document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const olvidóContraseña = document.getElementById('olvidadoContraseña');
    const registerLink = document.getElementById('registerLink');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombreUsuario = document.getElementById('nombre usuario').value;
        const contraseña = document.getElementById('contraseña').value;

        if (nombreUsuario === 'Almirante' && contraseña === '1234') {
            window.location.href = './dashboard.html';
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });

    cancelBtn.addEventListener('click', function() {
        loginForm.reset();
    });

    olvidóContraseña.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Funcionalidad de recuperación de contraseña no implementada.');
    });

    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Funcionalidad de registro no implementada.');
    });
});
