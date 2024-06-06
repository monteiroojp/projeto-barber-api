// Variáveis
const url = 'https://projeto-barbershop-api.onrender.com/api/v1/appoiments?createdBy=true';
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
        const allAppoiments = data.allAppoiments

        for (const appoiment of allAppoiments) {
            try {
                const serviceResponse = await fetch(`https://projeto-barbershop-api.onrender.com/api/v1/services/${appoiment.services}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const barberResponse = await fetch(`https://projeto-barbershop-api.onrender.com/api/v1/barbers/${appoiment.choosenBarber}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });

                const serviceData = await serviceResponse.json()
                const barberData = await barberResponse.json()

                appoiment.services = serviceData.service.name
                appoiment.choosenBarber = barberData.barber.name
            } catch (error) {
                console.log(error)
            }
        }

        createCards(allAppoiments)
    } catch (error) {
        console.log(error)
    }
};
        
            

const createCards = (allAppoiments) => {
    allAppoiments.forEach(appoiment => {
        // Formate date
        const [year, month, day] = appoiment.date.split('-');
        const formattedDate = `${day}/${month}/${year}`;

        // Create cards
        appointmentsContainer.innerHTML += `
            <div class="card container-fluid mb-3">
                <div class="card-body" id="${appoiment._id}">
                    <h5 class="card-title">Data: ${formattedDate}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Horário: ${appoiment.scheduledTime}</h6>
                    <p class="card-text">Serviço: ${appoiment.services}</p>
                    <p class="card-text">Barbeiro: ${appoiment.choosenBarber}</p>
                    <p class="card-text">Duração Total: ${appoiment.appoimentDuration} minutos</p>
                    <p class="card-text">Preço: R$${appoiment.totalPrice}</p>
                    <button class="btn btn-danger cancel-button">Cancelar Agendamento</button>
                </div>
            </div>
        `;
    }
    );
    addCancelListeners()
};

const addCancelListeners = () => {
    const cancelButtons = document.querySelectorAll('.cancel-button')
    cancelButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const appointmentId = event.target.closest('.card-body').id
            cancelAppointment(appointmentId);
        });
    });
};

const cancelAppointment = async (appointmentId) => {
    try {
        const response = await fetch(`https://projeto-barbershop-api.onrender.com/api/v1/appoiments/${appointmentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });
        if (response.ok) {
            document.getElementById(appointmentId).closest('.card').remove()
        } 
    } catch (error) {
        console.log(error)
    }
};

//Eventos
fetchCards()

