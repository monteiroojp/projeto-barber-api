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
            <a class="nav-link" href="./myAppoiments">Meus agendamentos</a>
        </li>       
        `
    }

    const decodedToken = jwt_decode(token);

    if(decodedToken.isAdmin){
        navBar.innerHTML += `
        <li class="nav-item">
        <a class="nav-link" href="./dashboard">Dashboard</a>
        </li>
        `
    }
   
    
}



//Chamadas
isLogged()