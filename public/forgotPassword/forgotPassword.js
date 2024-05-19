//Forgot Password script
import {forgotPasswordContainer, forgotPasswordForm, forgotPasswordUsernameInput, forgotPasswordPasswordInput, forgotPasswordButton, forgotPasswordVisiblePassword, forgotPasswordErrorContainer} from "./variables.js"

//Variáveis
const url = 'http://localhost:5000/api/v1/auth/forgotPassword'

//Funções
const passwordVisibility = () => {
    if(forgotPasswordPasswordInput.type == 'password'){
        forgotPasswordPasswordInput.type = 'text'
        forgotPasswordVisiblePassword.innerHTML = '<i class="fa-solid fa-eye"></i>'
    }
    else if(forgotPasswordPasswordInput.type == 'text'){
        forgotPasswordPasswordInput.type = 'password'
        forgotPasswordVisiblePassword.innerHTML = '<i class="fa-regular fa-eye-slash"></i>'
    }
}

const clearFilds = () => {
    const inputs = [forgotPasswordUsernameInput, forgotPasswordPasswordInput]
    inputs.forEach((input) => {
        input.value = ""
    })
}

const signReportValidity = () =>{
    return forgotPasswordForm.reportValidity()
} 

const clearError = (error) => {
    setTimeout(() => {
        error.remove()
    }, 3000)
    clearFilds()
}

const changePassword = async () => {
    if(signReportValidity){
        const account = {
            email: forgotPasswordUsernameInput.value,
            newPassword: forgotPasswordPasswordInput.value
        }

        console.log(account)

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(account)
        })

        console.log(response)

        if(response.ok){
            window.location.href = 'http://localhost:5000/login/'
            window.location.href = '../login'
            clearFilds()
        }
        else{
            const errorText = document.createElement('p')
            errorText.setAttribute('id', 'signErrorText')
            errorText.textContent = 'Email não cadastrado!'
            forgotPasswordErrorContainer.appendChild(errorText)
            clearError(errorText)
            clearFilds()
        }
        
        
    }
}

//Eventos
forgotPasswordVisiblePassword.addEventListener('click', passwordVisibility)
forgotPasswordButton.addEventListener('click', changePassword)
