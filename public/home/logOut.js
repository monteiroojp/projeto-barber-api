//Variáveis
const logoutButton = document.getElementById('logoutButton')



//Eventos
logoutButton.addEventListener('click', (event) => {
    event.preventDefault()
    localStorage.removeItem('jwtToken')
    location.reload()
})