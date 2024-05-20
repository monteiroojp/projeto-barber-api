// Variáveis
const url = 'http://localhost:5000/api/v1/appoiments?createdBy=true';
const appointmentsContainer = document.getElementById('appointmentsContainer');

// Funções
const fetchCards = async () => {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });
        const data = await response.json();

        const allAppoiments = data.allAppoiments;

        for (const appoiment of allAppoiments) {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/services/${appoiment.services}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const serviceData = await response.json();
                appoiment.services = serviceData.service.name;
            } catch (error) {
                console.log(error);
            }
        }

        for (const appoiment of allAppoiments) {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/barbers/${appoiment.choosenBarber}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const barberData = await response.json();
                appoiment.choosenBarber = barberData.barber.name;
            } catch (error) {
                console.log(error);
            }
        }

        createCards(allAppoiments);
    } catch (error) {
        console.log(error);
    }
};

const createCards = (allAppoiments) => {
    console.log(allAppoiments);
    appointmentsContainer.innerHTML = ''; // Clear existing content

    allAppoiments.forEach(appoiment => {
        // Formate date
        const [year, month, day] = appoiment.date.split('-');
        const formattedDate = `${day}/${month}/${year}`;

        // Create cards
        appointmentsContainer.innerHTML += `
            <div class="card container-fluid mb-3">
                <div class="card-body">
                    <h5 class="card-title">Data: ${formattedDate}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Hora: ${appoiment.scheduledTime}</h6>
                    <p class="card-text">Serviço: ${appoiment.services}</p>
                    <p class="card-text">Barbeiro: ${appoiment.choosenBarber}</p>
                    <p class="card-text">Duração Total: ${appoiment.appoimentDuration} minutos</p>
                    <p class="card-text">Preço: R$${appoiment.totalPrice}</p>
                    <button class="btn btn-danger" onclick="cancelAppointment('${appoiment._id}')">Cancelar Agendamento</button>
                </div>
            </div>
        `;
    });
};



fetchCards();

// Evento