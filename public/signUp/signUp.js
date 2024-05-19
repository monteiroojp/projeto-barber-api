//Sign script
import {singUpContainer, signForm, signEmailInput, signUsernameInput, signPasswordInput, signButton, signVisiblePassword, passwordInputContainer, signErrorTextContainer} from './variables.js'

//Variables
const url = 'http://localhost:5000/api/v1/auth/signUp'

//Funções
const passwordVisibility = () => {
    if(signPasswordInput.type == 'password'){
        signPasswordInput.type = 'text'
        signVisiblePassword.innerHTML = '<i class="fa-solid fa-eye"></i>'
    }
    else if(signPasswordInput.type == 'text'){
        signPasswordInput.type = 'password'
        signVisiblePassword.innerHTML = '<i class="fa-regular fa-eye-slash"></i>'
    }
}

const signReportValidity = () =>{
    return signForm.reportValidity()
} 

const clearFilds = () => {
    const inputs = [signEmailInput, signUsernameInput, signPasswordInput]
    inputs.forEach((input) => {
        input.value = ""
    })
}

const clearError = (error) => {
    setTimeout(() => {
        error.remove()
    }, 3000)
    clearFilds()
}

async function saveAccount() {
    if (signReportValidity()) {
        const account = {
            email: signEmailInput.value,
            name: signUsernameInput.value,
            password: signPasswordInput.value
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(account)
        })

        if(response.ok){
            const data = await response.json()
            localStorage.setItem('jwtToken', data.token)
            window.location.href = '../'
            clearFilds()
        }
        else{
            const errorText = document.createElement('p')
            errorText.setAttribute('id', 'signErrorText')
            errorText.textContent = 'Conta já cadastrada!'
            signErrorTextContainer.appendChild(errorText)
            clearError(errorText)
            clearFilds()
        }
    }
}

//Eventos
signVisiblePassword.addEventListener('click', passwordVisibility)
signButton.addEventListener('click', saveAccount)