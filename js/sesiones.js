let sessions = [];

document.addEventListener('DOMContentLoaded', function() {
    loadSessions();
    document.getElementById('add-edit-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('date').addEventListener('change', toggleLinkField);
});

function loadSessions() {
    const storedSessions = localStorage.getItem('sessions');
    if (storedSessions) {
        sessions = JSON.parse(storedSessions);
        renderSessions();
    }
}

function saveSessions() {
    localStorage.setItem('sessions', JSON.stringify(sessions));
}

function renderSessions() {
    const sessionList = document.getElementById('sessions');
    sessionList.innerHTML = '';
    sessions.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
    
    sessions.forEach(session => {
        const li = document.createElement('li');
        li.classList.add('fade-in');
        li.innerHTML = `
            <span>${session.date} ${session.time} - ${session.title}</span>
            <div>
                <button onclick="editSession('${session.id}')">Editar</button>
                <button onclick="deleteSession('${session.id}')">Eliminar</button>
                ${new Date(session.date + 'T' + session.time) < new Date() 
                    ? `<button onclick="showVideo('${session.id}')">Ver Video</button>`
                    : `<button onclick="showZoomLink('${session.id}')">Ver Enlace Zoom</button>`
                }
            </div>
        `;
        sessionList.appendChild(li);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('session-id').value;
    const date = document.getElementById('date').value;
    const isPassedDate = new Date(date) < new Date().setHours(0,0,0,0);
    
    const session = {
        id: id || Date.now().toString(),
        date: date,
        time: document.getElementById('time').value,
        title: document.getElementById('title').value,
        zoomLink: isPassedDate ? '' : document.getElementById('zoom-link').value,
        videoLink: isPassedDate ? document.getElementById('video-link').value : ''
    };
    
    if (id) {
        const index = sessions.findIndex(s => s.id === id);
        sessions[index] = session;
    } else {
        sessions.push(session);
    }
    
    saveSessions();
    renderSessions();
    document.getElementById('add-edit-form').reset();
    document.getElementById('session-id').value = '';
    toggleLinkField();
}

function editSession(id) {
    const session = sessions.find(s => s.id === id);
    document.getElementById('session-id').value = session.id;
    document.getElementById('date').value = session.date;
    document.getElementById('time').value = session.time;
    document.getElementById('title').value = session.title;
    document.getElementById('zoom-link').value = session.zoomLink;
    document.getElementById('video-link').value = session.videoLink;
    toggleLinkField();
}

function deleteSession(id) {
    sessions = sessions.filter(s => s.id !== id);
    saveSessions();
    renderSessions();
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

function showZoomLink(id) {
    const session = sessions.find(s => s.id === id);
    showPopup(`<h3>${session.title}</h3><p>Enlace de Zoom: <a href="${session.zoomLink}" target="_blank">${session.zoomLink}</a></p>`);
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

function toggleLinkField() {
    const date = new Date(document.getElementById('date').value);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const zoomLinkGroup = document.getElementById('zoom-link-group');
    const videoLinkGroup = document.getElementById('video-link-group');
    
    if (date < today) {
        zoomLinkGroup.style.display = 'none';
        videoLinkGroup.style.display = 'block';
    } else {
        zoomLinkGroup.style.display = 'block';
        videoLinkGroup.style.display = 'none';
    }
}