const serviceList = document.getElementById('serviceList');
const addServiceForm = document.getElementById('addServiceForm');
const editServiceForm = document.getElementById('editServiceForm');
const addServiceModal = new bootstrap.Modal(document.getElementById('addServiceModal'));
const editServiceModal = new bootstrap.Modal(document.getElementById('editServiceModal'));
let currentEditServiceId = '';

// Funções
const fetchServices = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/v1/services', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });
        const data = await response.json();
        const allServices = data.allservices;
        console.log(data)
        renderServices(allServices);
    } catch (error) {
        console.log(error);
    }
}

const renderServices = async (allServices) => {
    serviceList.innerHTML = '';
    allServices.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        serviceItem.innerHTML = `
            <div id="${service._id}">
                <p>Nome: ${service.name}</p>
                <p>Duração: ${service.duration} minutos</p>
                <p>Preço: R$${service.price}</p>
            </div>
            <div>
                <button class="btn btn-sm btn-warning me-2" onclick="openServiceEditModal('${service._id}', '${service.name}', '${service.duration}', '${service.price}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="confirmDeleteService('${service._id}')">Excluir</button>
            </div>
        `;
        serviceList.appendChild(serviceItem);
    });
}

const addService = async (event) => {
    event.preventDefault();
    const newService = {
        name: document.getElementById('addServiceName').value,
        duration: document.getElementById('addServiceDescription').value,
        price: document.getElementById('addServicePrice').value
    };

    try {
        const response = await fetch('http://localhost:5000/api/v1/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body: JSON.stringify(newService)
        });
        fetchServices();
        const data = await response.json();
        console.log(data);
        addServiceModal.hide();
    } catch (error) {
        console.log(error);
    }
}

const openServiceEditModal = (id, name, duration, price) => {
    currentEditServiceId = id;
    document.getElementById('editServiceName').value = name;
    document.getElementById('editServiceDescription').value = duration;
    document.getElementById('editServicePrice').value = price;
    editServiceModal.show();
}

const editService = async (event) => {
    event.preventDefault();
    const updatedService = {
        name: document.getElementById('editServiceName').value,
        duration: document.getElementById('editServiceDescription').value,
        price: document.getElementById('editServicePrice').value
    };

    try {
        await fetch(`http://localhost:5000/api/v1/services/${currentEditServiceId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body: JSON.stringify(updatedService)
        });
        fetchServices();
        editServiceModal.hide();
    } catch (error) {
        console.log(error);
    }
}

const confirmDeleteService = (id) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
        deleteService(id);
    }
}

const deleteService = async (id) => {
    try {
        await fetch(`http://localhost:5000/api/v1/services/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });
        fetchServices();
    } catch (error) {
        console.log(error);
    }
}

// Eventos
editServiceForm.addEventListener('submit', editService);
addServiceForm.addEventListener('submit', addService);

// Inicialização
fetchServices();
