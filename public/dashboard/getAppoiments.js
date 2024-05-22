//Variáveis
const appointmentList = document.getElementById('appointmentList');



//Funções
const fetchAppoiments = async () => {
    let queryParameters;

    const response = await fetch(`http://localhost:5000/api/v1/appoiments?${queryParameters}`, {
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('jwtToken')}`
        }
    })

    const data = await response.json()
    const allAppoiments = data.allAppoiments

    for (const appoiment of allAppoiments) {
        try {
            const serviceResponse = await fetch(`http://localhost:5000/api/v1/services/${appoiment.services}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            const barberResponse = await fetch(`http://localhost:5000/api/v1/barbers/${appoiment.choosenBarber}`, {
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
        appointmentItem.textContent = `Agendamento: ${appointment.services} - ${appointment.choosenBarber} - ${formattedDate} - ${appointment.scheduledTime}`;
        appointmentList.appendChild(appointmentItem);
    });
}


fetchAppoiments()

//Eventos