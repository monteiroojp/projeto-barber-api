//Variáveis
const appointmentList = document.getElementById('appointmentList');
const barberSelect = document.getElementById('barberSelect')
const serviceSelect = document.getElementById('serviceSelect')
const searchButton = document.getElementById('searchButton')
const sortSelect = document.getElementById('sortSelect')


//Funções
export const fetchAppoiments = async (queryParameters) => {
    const response = await fetch(`https://projeto-barbershop-api.onrender.com/api/v1/appoiments?${queryParameters}`, {
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('jwtToken')}`
        }
    })

    const data = await response.json()
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

            appoiment.services = serviceData.service?.name || 'Serviço removido'
            appoiment.choosenBarber = barberData.barber?.name || 'Barbeiro removido'
        } catch (error) {
            console.log(error)
        }
    }
    
    renderAppointments(allAppoiments)
}

const renderAppointments = async (allAppoiments) => {
    appointmentList.innerHTML = '';
    allAppoiments.forEach(appointment => {
        //Formate date
        const [year, month, day] = appointment.date.split('-');
        const formattedDate = `${day}/${month}/${year}`;

        const appointmentItem = document.createElement('div');
        appointmentItem.className = 'list-group-item';
        appointmentItem.textContent = `Agendamento: ${appointment.services} - ${appointment.choosenBarber} - ${formattedDate} - ${appointment.scheduledTime} - ${appointment.appoimentDuration} minutos - R$${appointment.totalPrice}`;
        appointmentList.appendChild(appointmentItem);
    });
}

const fetchBarbersForQuery = async () => {
    const response = await fetch('https://projeto-barbershop-api.onrender.com/api/v1/barbers', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
    })
    const data = await response.json()
    const allBarbers = data.allBarbers
    renderBarbersOptions(allBarbers)
}

const renderBarbersOptions =  (allBarbers) => {
    allBarbers.forEach((barber) => {
        const option = document.createElement('option');
        option.value = barber._id;
        option.textContent = barber.name;
        barberSelect.appendChild(option)
    })
}

const fetchServicesForQuery = async () => {
    const response = await fetch('https://projeto-barbershop-api.onrender.com/api/v1/services', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
    })
    const data = await response.json()
    const allServices = data.allservices
    renderServicesOptions(allServices)
}

const renderServicesOptions = (allServices) => {
    allServices.forEach((service) => {
        const option = document.createElement('option');
        option.value = service._id;
        option.textContent = service.name;
        serviceSelect.appendChild(option)
    })
}

const queryAppoiments = () => {
    const barber = barberSelect.value
    const service = serviceSelect.value
    console.log(service)
    const sort = sortSelect.value
    const queryParameters = new URLSearchParams({
        choosenBarber: barber !== '#' ? barber : '',
        serviceQuery: service !== '#' ? service : '',
        sort: sort
    }).toString();
    fetchAppoiments(queryParameters)
}


//Eventos
fetchAppoiments()
fetchBarbersForQuery()
fetchServicesForQuery()
searchButton.addEventListener('click', queryAppoiments)