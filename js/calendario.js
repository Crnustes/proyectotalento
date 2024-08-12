let sessions = [];
let currentDate = new Date();

document.addEventListener('DOMContentLoaded', function() {
    loadSessions();
    populateMonthYearSelects();
    renderCalendar();

    document.getElementById('month-select').addEventListener('change', updateCalendar);
    document.getElementById('year-select').addEventListener('change', updateCalendar);
});

function loadSessions() {
    const storedSessions = localStorage.getItem('sessions');
    if (storedSessions) {
        sessions = JSON.parse(storedSessions);
    }
}

function populateMonthYearSelects() {
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    monthSelect.value = currentDate.getMonth();
    yearSelect.value = currentDate.getFullYear();
}

function updateCalendar() {
    const month = parseInt(document.getElementById('month-select').value);
    const year = parseInt(document.getElementById('year-select').value);
    currentDate = new Date(year, month, 1);
    renderCalendar();
}

function renderCalendar() {
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Añadir encabezados de los días de la semana
    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    weekdays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('calendar-header');
        dayHeader.textContent = day;
        calendarDiv.appendChild(dayHeader);
    });

    // Añadir espacios en blanco para los días antes del primer día del mes
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarDiv.appendChild(emptyDay);
    }

    // Añadir los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.textContent = i;

        const currentDate = new Date(year, month, i);
        const daySessions = sessions.filter(s => {
            const sessionDate = new Date(s.date);
            return sessionDate.getFullYear() === year &&
                   sessionDate.getMonth() === month &&
                   sessionDate.getDate() === i;
        });

        if (daySessions.length > 0) {
            dayDiv.classList.add('has-session');
            dayDiv.onclick = () => showDaySessions(daySessions);
        }

        calendarDiv.appendChild(dayDiv);
    }
}

function showDaySessions(daySessions) {
    let content = '<h3>Sesiones del día</h3><ul>';
    daySessions.forEach(session => {
        content += `<li>${session.time} - ${session.title}`;
        if (new Date(session.date) < new Date()) {
            content += ` <button onclick="showVideo('${session.id}')">Ver Video</button>`;
        } else {
            content += ` <button onclick="showZoomLink('${session.id}')">Ver Enlace Zoom</button>`;
        }
        content += '</li>';
    });
    content += '</ul>';
    showPopup(content);
}

function showVideo(id) {
    const session = sessions.find(s => s.id === id);
    showPopup(`
        <h3>${session.title}</h3>
        <p>Enlace del video: ${session.videoLink}</p>
        <div id="video-container"></div>
    `);
    
    // Intentamos cargar el video después de que el popup se haya mostrado
    setTimeout(() => {
        const videoContainer = document.getElementById('video-container');
        const videoId = extractYoutubeId(session.videoLink);
        if (videoId) {
            videoContainer.innerHTML = `
                <iframe width="560" height="315" 
                    src="https://www.youtube.com/embed/${videoId}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        } else {
            videoContainer.innerHTML = '<p>No se pudo cargar el video. Verifica que la URL sea correcta.</p>';
        }
    }, 100);
}

function extractYoutubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function showPopup(content) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = content;
    popup.style.display = 'block';
    
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        popup.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    }
}