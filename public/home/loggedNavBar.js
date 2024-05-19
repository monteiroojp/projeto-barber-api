//Variáveis
const navBar = document.getElementById('navBar')

//Funções
const isLogged = () => {
    const token = localStorage.getItem('jwtToken')

    if(token != null || token.length !== 0){
        navBar.innerHTML = `
        <li class="nav-item">
        <a class="nav-link" href="#services">Serviços</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#agendamentos">Meus agendamentos</a>
        </li>       
        `
    }
}

//Chamadas
isLogged()