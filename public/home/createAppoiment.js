

document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('button.close')
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentService = document.getElementById('appointmentService');
    const appointmentBarber = document.getElementById('appointmentBarber');
    const token = localStorage.getItem('jwtToken')

    // Fetch services and populate the select options
    fetch('http://localhost:5000/api/v1/services')
        .then(response => response.json())
        .then(data => {
            data.allservices.forEach(service => {
                const option = document.createElement('option');
                option.value = service._id;
                option.textContent = service.name;
                appointmentService.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching services:', error));

    // Fetch barbers and populate the select options
    fetch('http://localhost:5000/api/v1/barbers', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            data.allBarbers.forEach(barber => {
                const option = document.createElement('option');
                option.value = barber._id;
                option.textContent = barber.name;
                appointmentBarber.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching barbers:', error));

    // Handle form submission
    appointmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const appointmentData = {
            date: document.getElementById('appointmentDate').value,
            scheduledTime: document.getElementById('appointmentTime').value,
            services: document.getElementById('appointmentService').value,
            choosenBarber: document.getElementById('appointmentBarber').value,
        };

        try {
            const response = await fetch('http://localhost:5000/api/v1/appoiments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify(appointmentData)
            });
            console.log(response)

            if (!response.ok) {
                throw new Error('Houve algum erro ao tentar criar o agendamento');
            }

            const result = await response.json();
            console.log(result)
            alert('Horário agendado com sucesso!');
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to create appointment');
        }
    });
});