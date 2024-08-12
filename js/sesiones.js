function cargarSesiones() {
    const sesiones = [
        { id: 1, fecha: '2024-08-15', titulo: 'Introducción a la programación', url: 'https://zoom.us/j/123456' },
        { id: 2, fecha: '2024-08-01', titulo: 'Estructuras de datos avanzadas', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 3, fecha: '2024-08-20', titulo: 'Algoritmos de búsqueda', url: 'https://zoom.us/j/789012' },
        { id: 4, fecha: '2024-07-25', titulo: 'Programación orientada a objetos', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    ];

    const listaSesiones = document.getElementById('lista-sesiones');
    listaSesiones.innerHTML = '';

    sesiones.forEach(sesion => {
        const fechaSesion = new Date(sesion.fecha);
        const hoy = new Date();
        const esPasada = fechaSesion < hoy;

        const sesionElement = document.createElement('div');
        sesionElement.classList.add('col-md-6', 'col-lg-4', 'mb-4');
        sesionElement.innerHTML = `
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${sesion.titulo}</h5>
                    <p class="card-text">Fecha: ${sesion.fecha}</p>
                    <div class="mt-auto">
                        ${esPasada 
                            ? `<button class="btn btn-primary w-100" onclick="abrirVideo('${sesion.video}')">
                                <i class="fas fa-play-circle me-2"></i>Ver grabación
                               </button>`
                            : `<a href="${sesion.url}" class="btn btn-success w-100" target="_blank">
                                <i class="fas fa-video me-2"></i>Unirse a la clase
                               </a>`
                        }
                        <div class="btn-group w-100 mt-2">
                            <button class="btn btn-secondary" onclick="editarSesion(${sesion.id})">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="btn btn-danger" onclick="eliminarSesion(${sesion.id})">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        listaSesiones.appendChild(sesionElement);
    });
}

function abrirVideo(videoUrl) {
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = videoUrl;
    const modal = new bootstrap.Modal(document.getElementById('videoModal'));
    modal.show();
}

function editarSesion(id) {
    console.log(`Editando sesión ${id}`);
}

function eliminarSesion(id) {
    console.log(`Eliminando sesión ${id}`);
}

document.addEventListener('DOMContentLoaded', cargarSesiones);