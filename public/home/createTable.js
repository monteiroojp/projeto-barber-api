const servicesBody = document.getElementById('servicesBody')
const servicesURL = "https://projeto-barbershop-api.onrender.com/api/v1/services"

const fetchData = async () => {
    try {
        const response = await fetch(servicesURL);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        createTable(data.allservices)
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

const createTable = (services) => {
    services.forEach(service => {
        servicesBody.innerHTML += 
        `
         <tr>
            <td>${service.name}</td>
            <td>R$${service.price}</td>
            <td>${service.duration} minutos</td>
         </tr>
        `
    });
}

fetchData();