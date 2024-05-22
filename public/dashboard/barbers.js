// Variáveis
const barberList = document.getElementById('barberList');
const addBarberForm = document.getElementById('addBarberForm');
const editBarberForm = document.getElementById('editBarberForm');
const addBarberModal = new bootstrap.Modal(document.getElementById('addBarberModal'));
const editBarberModal = new bootstrap.Modal(document.getElementById('editBarberModal'));
let currentEditBarberId = '';

// Funções
const fetchBarbers = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/v1/barbers', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });
        const data = await response.json();
        const allBarbers = data.allBarbers;
        renderBarbers(allBarbers);
    } catch (error) {
        console.log(error);
    }
}

const renderBarbers = async (allBarbers) => {
    barberList.innerHTML = '';
    allBarbers.forEach(barber => {
        const barberItem = document.createElement('div');
        barberItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        barberItem.innerHTML = `
            <div id="${barber._id}">
                <p>Nome: ${barber.name}</p>
                <p>Email: ${barber.email}</p>
                <p>Número: ${barber.phoneNumber}</p>
            </div>
            <div>
                <button class="btn btn-sm btn-warning me-2" onclick="openEditModal('${barber._id}', '${barber.name}', '${barber.email}', '${barber.phoneNumber}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="confirmDeleteBarber('${barber._id}')">Excluir</button>
            </div>
        `;
        barberList.appendChild(barberItem);
    });
}

const addBarber = async (event) => {
    console.log('opa')
    event.preventDefault();
    const newBarber = {
        name: document.getElementById('addBarberName').value,
        email: document.getElementById('addBarberEmail').value,
        phoneNumber: document.getElementById('addBarberPhoneNumber').value
    };

    try {
        const response = await fetch('http://localhost:5000/api/v1/barbers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body: JSON.stringify(newBarber)
        });
        fetchBarbers();
        const data = await response.json()
        console.log(data)
        addBarberModal.hide();
    } catch (error) {
        console.log(error);
    }
}

const openEditModal = (id, name, email, phoneNumber) => {
    currentEditBarberId = id;
    document.getElementById('editBarberName').value = name;
    document.getElementById('editBarberEmail').value = email;
    document.getElementById('editBarberPhoneNumber').value = phoneNumber;
    editBarberModal.show();
}

const editBarber = async (event) => {
    event.preventDefault();
    const updatedBarber = {
        name: document.getElementById('editBarberName').value,
        email: document.getElementById('editBarberEmail').value,
        phoneNumber: document.getElementById('editBarberPhoneNumber').value
    };

    try {
        await fetch(`http://localhost:5000/api/v1/barbers/${currentEditBarberId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body: JSON.stringify(updatedBarber)
        });
        fetchBarbers();
        editBarberModal.hide();
    } catch (error) {
        console.log(error);
    }
}


const confirmDeleteBarber = (id) => {
    if (confirm('Tem certeza que deseja excluir este barbeiro?')) {
        deleteBarber(id);
    }
}

const deleteBarber = async (id) => {
    try {
        await fetch(`http://localhost:5000/api/v1/barbers/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });
        fetchBarbers();
    } catch (error) {
        console.log(error);
    }
}


// Eventos
editBarberForm.addEventListener('submit', editBarber);
addBarberForm.addEventListener('submit', addBarber)
// Inicialização
fetchBarbers();