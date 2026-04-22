import axios from 'axios'

// const baseUrl = "https://localhost:7229/api/authentication"
const baseUrl = "https://jnbackendcareeria-bmf2ejavbecyc3aq.canadacentral-01.azurewebsites.net/swagger"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }