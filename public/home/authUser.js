const bannerButton = document.getElementById('bannerButton');
const appointmentModalElement = document.getElementById('appointmentModal');
const appointmentModal = new bootstrap.Modal(appointmentModalElement);

// Funções
const authUser = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        // Token JWT está presente, abrir o modal de agendamento
        appointmentModal.show();
    } else {
        // Token JWT não está presente, redirecionar para a página de login
        window.location.href = './login';
    }
};

// Eventos
bannerButton.addEventListener('click', () => {
    authUser();
    });

