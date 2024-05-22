//Variáveis
const addAdminForm = document.getElementById('addAdminForm');


//Funções
const addAdmin = async (user) => {
    user.adminToken = '9P19VJHxyiU0gThzeXt1lk26RdFUwdBV'
    try {
        const response = await fetch('http://localhost:5000/api/v1/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if(response.ok){
            window.alert('Conta adicionada com sucesso!')
        }
        else{
            window.alert('Tem de ser uma conta não cadastrada ainda!')
        }
       
    } catch (error) {
        window.alert('Tem de ser uma conta não cadastrada!')
    }
}

//Chamadas
addAdminForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = document.getElementById('adminName').value
    const email = document.getElementById('adminEmail').value
    const password = document.getElementById('adminPassword').value
    addAdmin({ name: name, email: email, password: password })
    addAdminForm.reset()
});