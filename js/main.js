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

const chatButton = document.getElementById('chat-button');
const chatContainer = document.getElementById('chat-container');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
let userName = '';
let isAskingName = true;

chatButton.addEventListener('click', () => {
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        
        if (isAskingName) {
            userName = message;
            isAskingName = false;
            setTimeout(() => {
                addMessage('bot', `¡Hola ${userName}! ¿En qué te puedo ayudar?`);
            }, 1000);
        } else {
            setTimeout(() => {
                addMessage('bot', `${userName}, gracias por tu mensaje. ¿En qué más puedo ayudarte?`);
            }, 1000);
        }
    }
}

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.innerText = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});