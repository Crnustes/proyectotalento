document.addEventListener('DOMContentLoaded', (event) => {
    const logoutBtn = document.getElementById('logout-btn');
    const menuItems = document.querySelectorAll('#side-menu a');
    const contentArea = document.getElementById('content-area');
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');

    // Funcionalidad del botón de salir
    logoutBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    // Navegación del menú lateral
    // menuItems.forEach(item => {
    //     item.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         const page = e.currentTarget.getAttribute('href').substring(1);
            
    //         if (window.innerWidth <= 768) {
    //             sideMenu.classList.remove('active');
    //         }
    //     });
    // });

    // Funcionalidad del botón de menú en responsive
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic fuera de él en modo responsive
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !sideMenu.contains(e.target) && e.target !== menuToggle) {
            sideMenu.classList.remove('active');
        }
    });

    // Ajustar visibilidad del menú toggle en cambios de tamaño de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sideMenu.classList.remove('active');
        }
    });
});